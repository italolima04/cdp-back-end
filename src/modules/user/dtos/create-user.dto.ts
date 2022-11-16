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

class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Fulano' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'da Silva' })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'fulano.silva@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/, {
    message:
      'Seu CPF deve seguir o padrão de ter 11 dígitos e ter ou não os caracteres especiais.',
  })
  @ApiProperty({ examples: ['xxx.xxx.xxx-xx', 'xxxxxxxxxxx'] })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^((\+|00)(55)\s?)(\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{4})(\d{4}))$/,
    {
      message:
        'Seu telefone deve informar o código do país, o DDD, possuir o dígito 9 e seguir com o restante do número.',
    },
  )
  @ApiProperty({ example: '+55XX9XXXXXXXX' })
  phone: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Sua senha deve ter pelo menos 6 caracteres (no mínimo 1 letra maiúscula, letras minúsculas, números e caracteres especiais).',
  })
  @ApiProperty({
    example: 'Admin1234',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1995-05-12',
  })
  birthdate: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'male',
  })
  gender: Gender;

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

export default CreateUserDto;
