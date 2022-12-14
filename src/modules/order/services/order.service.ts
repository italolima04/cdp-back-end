import { CouponService } from '@/modules/coupon/services/coupon.service';
import { Coupon, Order, Plan, PrismaService } from '@/modules/prisma';
import UserService from '@/modules/user/services/user.service';
import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDTO } from '../dtos/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private couponService: CouponService,
    private userService: UserService,
    private mailerService: MailerService,
  ) {}
  async create(loggedUserId: string, createOrderDTO: CreateOrderDTO) {
    const {
      planId,
      email,
      cpf,
      fullName,
      phone,
      city,
      state,
      country,
      street,
      neighbourhood,
      zipcode,
      number,
      complement,
      couponId,
      deliveryTime,
      formOfPayment,
    } = createOrderDTO;

    const planExists = await this.prisma.plan.findUnique({
      where: {
        id: planId,
      },
    });

    if (!planExists) {
      throw new NotFoundException('Plano não encontrado.');
    }

    let couponExists: Coupon = null;
    if (couponId) {
      couponExists = await this.prisma.coupon.findUnique({
        where: {
          id: couponId,
        },
      });
    }

    let valueOfOrder = 0;
    let taxDelivery = createOrderDTO.taxDelivery;

    if (couponExists?.titleCode === 'FRETEGRATIS') {
      taxDelivery = 0;
      valueOfOrder = planExists.price;
    }

    console.log(planExists.price);
    console.log(taxDelivery);
    console.log(couponExists?.discount);

    if (couponExists && couponExists.discount) {
      valueOfOrder = planExists.price + taxDelivery - couponExists.discount;
    }

    console.log(valueOfOrder);

    let createdOrder: Order;
    if (couponExists) {
      createdOrder = await this.prisma.order.create({
        data: {
          subscription: {
            create: {
              isActive: true,
              plan: {
                connect: {
                  id: planId,
                },
              },
              user: {
                connect: {
                  id: loggedUserId,
                },
              },
            },
          },
          address: {
            create: {
              city,
              state,
              country,
              street,
              neighbourhood,
              zipcode,
              number,
              complement: complement ? complement : undefined,
            },
          },
          coupon: couponExists && {
            connect: {
              id: couponExists.id,
            },
          },
          receiverEmail: email,
          receiverCPF: cpf,
          receiverFullName: fullName,
          receiverPhone: phone,
          deliveryTime,
          taxDelivery,
          totalPrice: valueOfOrder,
        },
      });
    } else {
      createdOrder = await this.prisma.order.create({
        data: {
          subscription: {
            create: {
              isActive: true,
              plan: {
                connect: {
                  id: planId,
                },
              },
              user: {
                connect: {
                  id: loggedUserId,
                },
              },
            },
          },
          address: {
            create: {
              city,
              state,
              country,
              street,
              neighbourhood,
              zipcode,
              number,
              complement: complement ? complement : undefined,
            },
          },
          receiverEmail: email,
          receiverCPF: cpf,
          receiverFullName: fullName,
          receiverPhone: phone,
          deliveryTime,
          taxDelivery,
          totalPrice: valueOfOrder,
          formOfPayment,
        },
      });
    }

    if (!createdOrder) {
      throw new BadRequestException('Erro ao realizar pedido.');
    }

    const mail = {
      to: createdOrder.receiverEmail,
      from: `${process.env.EMAIL}`,
      subject: 'Pedido confirmado com sucesso! Trama is comming :)',
      template: 'order-confirmed',
      context: {
        user: createdOrder.receiverFullName,
        city: city,
        state: state,
      },
    };

    await this.mailerService.sendMail(mail);

    return {
      data: createdOrder,
      status: HttpStatus.OK,
      message: 'Order created successfully',
    };
  }
}
