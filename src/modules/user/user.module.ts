import { Module } from '@nestjs/common';
import { PrismaService } from '@Prisma/index';

import UserService from './services/user.service';
import UserController from './controller/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
