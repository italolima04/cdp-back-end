import { Module } from '@nestjs/common';
import { PlanService } from './services/plan.service';
import { PlanController } from './controllers/plan.controller';
import { PrismaService } from '../prisma';

@Module({
  controllers: [PlanController],
  providers: [PlanService, PrismaService],
})
export class PlanModule {}
