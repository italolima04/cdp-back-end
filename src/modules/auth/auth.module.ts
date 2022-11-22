import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import secret from '@Config/jwt-config';

import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from '../prisma';
import SendEmailWithTokenService from './services/send-email-with-token.service';
import SendEmailConfirmRecoverPasswordService from './services/send-email-confirm-recover-password.service';
import SendEmailWithTokenForRecoverPasswordService from './services/send-email-with-token-for-recover-password.service';
import RedefinePasswordService from './services/redefine-password.service';
import { VerifyTokenService } from './services/verify-token.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: secret.secret,
      signOptions: { expiresIn: secret.expires_in },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    SendEmailWithTokenService,
    RedefinePasswordService,
    SendEmailConfirmRecoverPasswordService,
    SendEmailWithTokenForRecoverPasswordService,
    VerifyTokenService,
  ],
})
export class AuthModule {}
