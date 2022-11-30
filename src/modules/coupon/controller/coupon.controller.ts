import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

  // @Get()
  // findAll() {
  //   return this.couponService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.couponService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
  //   return this.couponService.update(+id, updateCouponDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.couponService.remove(+id);
  // }
}
