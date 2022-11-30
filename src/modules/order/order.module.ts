import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controller/order.controller';
import { PrismaService } from '../prisma';
import { CouponService } from '../coupon/services/coupon.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, CouponService],
})
export class OrderModule {}
