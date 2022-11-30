import { Module } from '@nestjs/common';
import { WaitlistService } from './services/waitlist.service';
import { WaitlistController } from './controller/waitlist.controller';
import { PrismaService } from '@Prisma/index';

@Module({
  controllers: [WaitlistController],
  providers: [WaitlistService, PrismaService],
})
export class WaitlistModule {}
