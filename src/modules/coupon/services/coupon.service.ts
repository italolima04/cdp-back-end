import { PrismaService } from '@/modules/prisma';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { subDays } from 'date-fns';
import { CreateCouponDTO } from '../dtos/create-coupon.dto';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}
  async create(createCouponDTO: CreateCouponDTO) {
    const { initialDate, expiredDate } = createCouponDTO;
    const createdCoupon = await this.prisma.coupon.create({
      data: {
        ...createCouponDTO,
        isPermanent: expiredDate ? false : true,
        initialDate: initialDate ? new Date(initialDate) : undefined,
        expiredDate: expiredDate ? new Date(expiredDate) : undefined,
      },
    });

    if (!createdCoupon) {
      throw new BadRequestException('Erro ao criar cupom de desconto.');
    }

    return {
      data: createdCoupon,
      status: HttpStatus.OK,
      message: 'Coupon created successfully',
    };
  }

  async verifyCoupon(titleCode: string) {
    const currentDate = new Date();

    const coupon = await this.prisma.coupon.findUnique({
      where: {
        titleCode: titleCode,
      },
    });

    if (!coupon) {
      throw new BadRequestException('Erro. Cumpom inválido.');
    }

    let validCoupon = true;

    if (coupon && !coupon.isPermanent) {
      if (coupon.initialDate && currentDate >= coupon.initialDate) {
        if (coupon.expiredDate && currentDate <= coupon.expiredDate)
          validCoupon = true;
        else if (!coupon.expiredDate) validCoupon = true;
        else validCoupon = false;
      } else {
        validCoupon = false;
      }
    } else {
      validCoupon = false;
    }

    if (!validCoupon) {
      throw new BadRequestException('Erro. Cumpom expirado ou não disponível.');
    }

    return {
      data: coupon,
      status: HttpStatus.OK,
      message: 'Valid coupon returned',
    };
  }
  // findAll() {
  //   return `This action returns all coupon`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} coupon`;
  // }
  // update(id: number, updateCouponDto: UpdateCouponDto) {
  //   return `This action updates a #${id} coupon`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} coupon`;
  // }
}
