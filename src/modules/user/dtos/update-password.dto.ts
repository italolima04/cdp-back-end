import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

class UpdatePasswordDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({
    example: 'Admin1234',
  })
  lastPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({
    example: 'Admin1234',
  })
  password: string;
}

export default UpdatePasswordDTO;
