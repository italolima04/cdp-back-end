import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import CreateUserDto from './create-user.dto';

class UpdateUserDto implements Partial<CreateUserDto> {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'Fulano' })
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'da Silva' })
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  @ApiProperty({ example: 'fulano.silva@gmail.com' })
  email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Matches(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/, {
    message:
      'Seu CPF deve seguir o padrão de ter 11 dígitos e ter ou não os caracteres especiais.',
  })
  @ApiProperty({ examples: ['xxx.xxx.xxx-xx', 'xxxxxxxxxxx'] })
  cpf?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Matches(
    /^((\+|00)(55)\s?)(\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{4})(\d{4}))$/,
    {
      message:
        'Seu telefone deve informar o código do país, o DDD, possuir o dígito 9 e seguir com o restante do número.',
    },
  )
  @ApiProperty({ example: '+55XX9XXXXXXXX' })
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: '1995-05-12',
  })
  birthdate: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: 'male',
  })
  gender?: Gender;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: 'Rua A',
  })
  street?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: 'Cidade B',
  })
  city?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: 'Bairro J',
  })
  neighbourhood?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: 'xxxxx-xxx',
  })
  zipcode?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: 'Estado X',
  })
  state?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: 'País Z',
  })
  country?: string;
}

export default UpdateUserDto;
