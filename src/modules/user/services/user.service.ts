import { Injectable } from '@nestjs/common';
import CreateUserDto from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import User from '../entities/user.entity';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<User> {
    return new User();
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
