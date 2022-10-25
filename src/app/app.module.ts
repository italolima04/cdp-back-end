import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ManagerModule } from '../modules/manager/manager.module';
import { PlanModule } from '../modules/plan/plan.module';
import { ProductModule } from '../modules/product/product.module';
import { SubscriptionModule } from '../modules/subscription/subscription.module';
import { UserModule } from '../modules/user/user.module';
import { WaitlistModule } from '../modules/waitlist/waitlist.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ManagerModule,
    WaitlistModule,
    PlanModule,
    ProductModule,
    SubscriptionModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
