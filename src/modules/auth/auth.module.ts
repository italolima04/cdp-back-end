import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import secret from '../../config/jwt-config';
import { PrismaService } from '../prisma';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: secret.secret,
      signOptions: { expiresIn: secret.expires_in },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
