import { PrismaService } from '@/modules/prisma';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { subDays } from 'date-fns';
import { CreateCouponDTO } from '../dtos/create-coupon.dto';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}
  async create(createCouponDTO: CreateCouponDTO) {
    const { expiredDate } = createCouponDTO;
    const createdCoupon = await this.prisma.coupon.create({
      data: {
        ...createCouponDTO,
        isPermanent: expiredDate ? false : true,
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

    let validCoupon = false;

    if (coupon && coupon.isPermanent) {
      //console.log(subDays(currentDate, coupon.initialDate));
      // if (coupon.initialDate && subDays(currentDate, coupon.initialDate) >= 0) {
      //   console.log('aqui');
      //   validCoupon = true;
      // } else {
      //   validCoupon = false;
      // }
    } else {
      // if (
      //   coupon.initialDate &&
      //   coupon.expiredDate &&
      //   coupon.expiredDate >= currentDate
      // ) {
      //   validCoupon = true;
      // } else {
      //   validCoupon = false;
      // }
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
