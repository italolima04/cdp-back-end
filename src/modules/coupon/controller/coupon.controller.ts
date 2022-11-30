import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateCouponDTO } from '../dtos/create-coupon.dto';
import { CouponService } from '../services/coupon.service';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('/create')
  create(@Body() createCouponDTO: CreateCouponDTO) {
    return this.couponService.create(createCouponDTO);
  }

  @Get('/verify/:titleCode')
  verifyCoupon(@Param('titleCode') titleCode: string) {
    return this.couponService.verifyCoupon(titleCode);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
  //   return this.couponService.update(+id, updateCouponDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.couponService.remove(+id);
  // }
}
