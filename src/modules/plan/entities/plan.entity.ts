import { ApiProperty } from '@nestjs/swagger';
import { Plan } from '@prisma/client';

export class PlanEntity implements Partial<Plan> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  status?: boolean;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  image: string;

  constructor(partial: Partial<Plan>) {
    Object.assign(this, partial);
  }
}
