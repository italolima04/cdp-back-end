import { ApiProperty } from '@nestjs/swagger';
import { Plan, StatusPlan } from '@prisma/client';

export class PlanEntity implements Partial<Plan> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  status?: StatusPlan;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  constructor(partial: Partial<Plan>) {
    Object.assign(this, partial);
  }
}
