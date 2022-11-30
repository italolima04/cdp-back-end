import { mailerConfig } from '@/config/mailer.config';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ManagerModule } from '@Modules/manager/manager.module';
import { PlanModule } from '@Modules/plan/plan.module';
import { ProductModule } from '@Modules/product/product.module';
import { SubscriptionModule } from '@Modules/subscription/subscription.module';
import { UserModule } from '@Modules/user/user.module';
import { WaitlistModule } from '@Modules/waitlist/waitlist.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@Modules/auth/auth.module';
import { EnsureAuthenticatedMiddleware } from '@Middleware/middlewares';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShipmentModule } from '@/modules/shipment/shipment.module';
import { CouponModule } from '@/modules/coupon/coupon.module';
import { OrderModule } from '@/modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ManagerModule,
    WaitlistModule,
    PlanModule,
    ProductModule,
    SubscriptionModule,
    ShipmentModule,
    MailerModule.forRoot(mailerConfig),
    AuthModule,
    CouponModule,
    OrderModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthenticatedMiddleware)
      .exclude(
        { path: '/api/v1/user', method: RequestMethod.POST },
        { path: '/api/v1/auth', method: RequestMethod.POST },
        { path: '/api/v1/waitlist', method: RequestMethod.POST },
        {
          path: '/api/v1/shipment/calculate/:zipCode',
          method: RequestMethod.GET,
        },
        {
          path: '/api/v1/shipment/consult/:zipCode',
          method: RequestMethod.GET,
        },
        {
          path: '/api/v1/shipment/track/:trackingCode',
          method: RequestMethod.GET,
        },
        { path: '/api/v1/auth/verify-token/:token', method: RequestMethod.GET },
        { path: '/api/v1/auth/recover-password', method: RequestMethod.POST },
        { path: '/api/v1/auth/redefine-password', method: RequestMethod.POST },
        { path: '/api/v1/coupon/create', method: RequestMethod.POST },
        { path: '/api/v1/order/create', method: RequestMethod.POST },
        { path: '/api/v1/coupon/verify/:titleCode', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
