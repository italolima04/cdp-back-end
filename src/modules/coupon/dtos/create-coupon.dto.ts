import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCouponDTO {
  @IsNotEmpty()
  @ApiProperty()
  titleCode: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsOptional()
  @ApiProperty()
  benefit?: string;

  @IsOptional()
  @ApiProperty()
  discount?: number;

  @IsOptional()
  @ApiProperty()
  isPermanent?: boolean;

  @IsOptional()
  initialDate?: Date;

  @IsOptional()
  expiredDate?: Date;

  @IsEmpty()
  createdAt: Date;

  @IsEmpty()
  updatedAt: Date;
}
