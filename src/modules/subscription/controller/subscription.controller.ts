import { UserDecorator } from '@/decorators/user.decorator';
import User from '@/modules/user/entities/user.entity';
import {
  Controller,
  Get,
  Param,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SubscriptionService } from '../services/subscription.service';

@ApiTags('subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  findAll(
    @UserDecorator() user: User,
    @Query('isActive', new DefaultValuePipe(true), ParseBoolPipe)
    isActive = true,
    @Query('planActive', new DefaultValuePipe(true), ParseBoolPipe)
    planActive = true,
  ) {
    return this.subscriptionService.getMySubscriptions(user.id, {
      isActive,
      planActive,
    });
  }

  @Put('disable/:id')
  disableSubscription(@Param('id') id: string) {
    return this.subscriptionService.disableMySubscription(id);
  }
}
