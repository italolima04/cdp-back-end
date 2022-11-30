import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SearchSubscriptionDTO {
  @IsOptional()
  @ApiProperty()
  isActive: boolean;

  @IsOptional()
  @ApiProperty()
  planActive: boolean;
}
