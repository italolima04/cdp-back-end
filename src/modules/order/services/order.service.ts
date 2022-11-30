import { CouponService } from '@/modules/coupon/services/coupon.service';
import { Coupon, Plan, PrismaService } from '@/modules/prisma';
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

    const planExists = await this.prisma
      .$queryRaw<Plan>`SELECT * FROM public.plan WHERE id = ${planId}`;

    if (!planExists) {
      throw new NotFoundException('Plano não encontrado.');
    }

    let couponExists: Coupon = null;
    if (couponId) {
      couponExists = await this.prisma
        .$queryRaw<Coupon>`SELECT * FROM public."coupon" WHERE id = ${couponId}`;
    }

    let valueOfOrder = 0;
    let taxDelivery = createOrderDTO.taxDelivery;

    if (couponExists.titleCode === 'FRETEGRATIS') {
      taxDelivery = 0;
      valueOfOrder = planExists.price;
    }

    valueOfOrder = planExists.price + taxDelivery - couponExists.discount;

    const createdOrder = await this.prisma.order.create({
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
        coupon: {
          connect: {
            id: couponExists ? couponExists.id : undefined,
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
