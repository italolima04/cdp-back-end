import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { UserModule } from './user/user.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ProductModule } from './product/product.module';
import { PlanModule } from './plan/plan.module';
import { WaitlistModule } from './waitlist/waitlist.module';
import { ManagerModule } from './manager/manager.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ManagerModule, WaitlistModule, PlanModule, ProductModule, SubscriptionModule],
=======

@Module({
  imports: [],
>>>>>>> f781211 (chore: initial structure of project)
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
