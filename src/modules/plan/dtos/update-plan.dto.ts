import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdatePlanDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  status?: boolean;

  @IsPositive()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;
}
