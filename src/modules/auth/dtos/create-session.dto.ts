import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSessionDTO {
  @ApiProperty({ example: 'emailofuser@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Qwe.123' })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}
