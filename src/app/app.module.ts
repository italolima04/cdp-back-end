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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ManagerModule,
    WaitlistModule,
    PlanModule,
    ProductModule,
    SubscriptionModule,
    MailerModule.forRoot(mailerConfig),
    AuthModule,
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
          path: '/api/v1/auth/verify-token/:token',
          method: RequestMethod.GET,
        },
        { path: '/api/v1/auth/recover-password', method: RequestMethod.POST },
        { path: '/api/v1/auth/redefine-password', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
