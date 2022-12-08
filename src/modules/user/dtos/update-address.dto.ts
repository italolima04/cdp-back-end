import { IsOptional, IsString } from 'class-validator';

export class UpdateAddressDTO {
  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  neighbourhood?: string;

  @IsString()
  @IsOptional()
  zipcode?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  number: string;

  @IsString()
  @IsOptional()
  complement: string;
}
