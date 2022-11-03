import { ManagerModule } from '@Modules/manager/manager.module';
import { PlanModule } from '@Modules/plan/plan.module';
import { ProductModule } from '@Modules/product/product.module';
import { SubscriptionModule } from '@Modules/subscription/subscription.module';
import { UserModule } from '@Modules/user/user.module';
import { WaitlistModule } from '@Modules/waitlist/waitlist.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../modules/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ManagerModule,
    WaitlistModule,
    PlanModule,
    ProductModule,
    SubscriptionModule,
    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
