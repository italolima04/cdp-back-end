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
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor({
    id,
    firstName,
    lastName,
    email,
    cpf,
    phone,
    password,
    birthdate,
    gender,
    avatar,
    street,
    city,
    neighbourhood,
    zipcode,
    state,
    country,
    createdAt,
    updatedAt,
  }: Partial<User>) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.cpf = cpf;
    this.phone = phone;
    this.password = password;
    this.birthdate = birthdate;
    this.gender = gender;
    this.avatar = avatar;
    this.street = street;
    this.city = city;
    this.neighbourhood = neighbourhood;
    this.zipcode = zipcode;
    this.state = state;
    this.country = country;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default User;
