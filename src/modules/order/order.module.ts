import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controller/order.controller';
import { PrismaService } from '../prisma';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class OrderModule {}
