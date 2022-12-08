import { ApiProperty } from '@nestjs/swagger';
import { Gender, User as Users } from '@prisma/client';
import { Exclude } from 'class-transformer';

class User implements Partial<Users> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  phone: string;

  @Exclude()
  @ApiProperty()
  password: string;

  @ApiProperty()
  birthdate: Date;

  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  neighbourhood: string;

  @ApiProperty()
  zipcode: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  complement: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export default User;
