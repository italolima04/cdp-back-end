import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateWaitlistDTO {
  @ApiProperty({
    example: 'Don Juan',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'example@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Quixadá',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    example: 'Ceará',
  })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({
    example: 'Estou muito ansioso pelo produto!',
  })
  @IsOptional()
  @IsString()
  note: string;

  @ApiProperty({
    example: true,
  })
  @IsNotEmpty()
  receiveUpdates: boolean;

  @IsEmpty()
  createdAt: Date;

  @IsEmpty()
  updatedAt: Date;
}
