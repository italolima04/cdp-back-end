import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controller/order.controller';
import { PrismaService } from '../prisma';
import { CouponService } from '../coupon/services/coupon.service';
import User from '../user/entities/user.entity';
import UserService from '../user/services/user.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, CouponService, UserService],
})
export class OrderModule {}
