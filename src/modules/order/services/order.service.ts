import { CouponService } from '@/modules/coupon/services/coupon.service';
import { Coupon, Order, Plan, PrismaService } from '@/modules/prisma';
import UserService from '@/modules/user/services/user.service';
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
      complement,
      couponId,
      deliveryTime,
    } = createOrderDTO;

    console.log(
      await this.userService.me({
        id: '74678e35-1622-4940-8d91-0e17feb3d1c5',
        avatar: false,
      }),
    );

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

    valueOfOrder = planExists.price + taxDelivery - couponExists?.discount;
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
        },
      });
    }

    if (!createdOrder) {
      throw new BadRequestException('Erro ao realizar pedido.');
    }

    return {
      data: createdOrder,
      status: HttpStatus.OK,
      message: 'Order created successfully',
    };
  }

  // findAll() {
  //   return `This action returns all order`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
