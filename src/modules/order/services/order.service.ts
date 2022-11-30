import { PrismaService } from '@/modules/prisma';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDTO } from '../dtos/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
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
      titleCode,
    } = createOrderDTO;

    const planExists = await this.prisma
      .$queryRaw`SELECT * FROM public.plan WHERE id = ${planId}`;

    if (!planExists) {
      throw new NotFoundException('Plano não encontrado.');
    }

    const emailIsOfCurrentUser = await this.prisma
      .$queryRaw`SELECT * FROM public."user" WHERE email = ${email}`;

    if (!emailIsOfCurrentUser) {
      throw new NotFoundException(
        'O email informado não perrtence ao usuário logado.',
      );
    }

    const currentDate = new Date();

    const validCoupon = await this.prisma.coupon.findFirst({
      where: {
        titleCode,
        initialDate: {
          lte: currentDate,
        },
        expiredDate: {
          gte: currentDate,
        },
      },
    });

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
            id: validCoupon ? validCoupon.id : undefined,
          },
        },
        receiverEmail: email,
        receiverCPF: cpf,
        receiverFullName: fullName,
        receiverPhone: phone,
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
