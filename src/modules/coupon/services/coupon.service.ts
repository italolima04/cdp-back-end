import { PrismaService } from '@/modules/prisma';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
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
