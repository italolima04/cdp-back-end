import { mailerConfig } from '@/config/mailer.config';
import { ManagerModule } from '@Modules/manager/manager.module';
import { PlanModule } from '@Modules/plan/plan.module';
import { ProductModule } from '@Modules/product/product.module';
import { SubscriptionModule } from '@Modules/subscription/subscription.module';
import { UserModule } from '@Modules/user/user.module';
import { WaitlistModule } from '@Modules/waitlist/waitlist.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    MailerModule.forRoot(mailerConfig),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
