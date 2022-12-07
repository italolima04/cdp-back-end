import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

class CreateAddressDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Rua A',
  })
  street: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Cidade B',
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Bairro J',
  })
  neighbourhood: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{5}-[0-9]{3}$/, {
    message:
      'O seu zipcode deve seguir o padrão de cinco dígitos, um traço e o restante dos três dígitos',
  })
  @ApiProperty({
    example: 'xxxxx-xx',
  })
  zipcode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Estado X',
  })
  state: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'País Z',
  })
  country: string;
}

export default CreateAddressDTO;
