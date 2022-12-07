import { UserDecorator } from '@/decorators/user.decorator';
import User from '@/modules/user/entities/user.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { OrderService } from '../services/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create')
  create(@UserDecorator() user: User, @Body() createOrderDTO: CreateOrderDTO) {
    return this.orderService.create(user.id, createOrderDTO);
  }
}
