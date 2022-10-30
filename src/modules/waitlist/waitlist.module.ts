import { Module } from '@nestjs/common';
import { WaitlistService } from './services/waitlist.service';
import { WaitlistController } from './controller/waitlist.controller';
import { PrismaService } from '@/database/prisma.service';

@Module({
  controllers: [WaitlistController],
  providers: [WaitlistService, PrismaService],
})
export class WaitlistModule {}
