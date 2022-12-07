import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from '@Prisma/index';
import { join } from 'path';
import { promises } from 'fs';
import uploadConfig from '@Config/upload.config';

import CreateUserDto from '../dtos/create-user.dto';
import UpdateUserDto from '../dtos/update-user.dto';
import User from '../entities/user.entity';
import UpdateAvatarDto from '../dtos/update-avatar.dto';
import MeUserDto from '../dtos/me-user.dto';

@Injectable()
class UserService {
  constructor(private prisma: PrismaService) {}

  async me({ id, avatar }: MeUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(
        'Usuário para listagem dos dados não encontrado.',
      );
    }

    if (avatar && user.avatar) {
      user.avatar = `${process.env.URL_FILES_AVATAR}${user.avatar}`;
    }

    return new User({ ...user });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existsUserBySensitiveData = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { phone: createUserDto.phone },
          { cpf: createUserDto.cpf },
        ],
      },
    });

    if (existsUserBySensitiveData) {
      throw new ConflictException(
        'Os dados de E-mail, Telefone ou CPF já estão em uso por outro usuário.',
      );
    }

    const createdUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        birthdate: new Date(createUserDto.birthdate),
        password: await hash(
          createUserDto.password,
          parseInt(process.env.HASH_SALT),
        ),
      },
    });

    return new User({ ...createdUser });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(
        'Usuário não encontrado para a atualização dos dados.',
      );
    }

    if (updateUserDto.email) {
      const userExistsByEmail = await this.prisma.user.findFirst({
        where: { email: updateUserDto.email },
      });

      if (userExistsByEmail) {
        throw new ConflictException('Já existe um usuário com este e-mail.');
      }
    }

    if (updateUserDto.phone) {
      const userExistsByPhone = await this.prisma.user.findFirst({
        where: { phone: updateUserDto.phone },
      });

      if (userExistsByPhone) {
        throw new ConflictException(
          'Já existe um usuário com este número de telefone.',
        );
      }
    }

    if (updateUserDto.cpf) {
      const userExistsByCpf = await this.prisma.user.findFirst({
        where: { cpf: updateUserDto.cpf },
      });

      if (userExistsByCpf) {
        throw new ConflictException(
          'Já existe um usuário com este número CPF.',
        );
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });

    return new User({ ...updatedUser });
  }

  async updateAvatar({ id, avatar }: UpdateAvatarDto): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(
        'Usuário para atualização do avatar não encontrado.',
      );
    }

    if (user.avatar) {
      const userAvatarFilePath = join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await promises.unlink(userAvatarFilePath);
      }
    }

    const updatedUserAvatar = await this.prisma.user.update({
      where: { id },
      data: { avatar },
    });

    return new User({ ...updatedUserAvatar });
  }

  async findOrdersByUserId(userId: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new NotFoundException('Erro. Usuário não encontrado.');
    }

    const ordersOfUser = await this.prisma.order.findMany({
      where: {
        subscription: {
          userId: userExists.id,
        },
      },
      select: {
        id: true,
        address: true,
        receiverCPF: true,
        receiverEmail: true,
        receiverPhone: true,
        receiverFullName: true,
        coupon: true,
        deliveryTime: true,
        taxDelivery: true,
        totalPrice: true,
        subscription: {
          select: {
            plan: true,
            user: true,
          },
        },
      },
    });

    const formattedOrdersOfUser = ordersOfUser.map((order) => {
      const formattedData = {
        id: order.id,
        taxDelivery: order.taxDelivery,
        deliveryTime: order.deliveryTime,
        totalPrice: order.totalPrice,
        address: {
          city: order.address.city,
          state: order.address.state,
          country: order.address.country,
          zipcode: order.address.zipcode,
          street: order.address.street,
          neighbourhood: order.address.neighbourhood,
        },
        receiver: {
          emailReceiver: order.receiverEmail,
          cpfReceiver: order.receiverCPF,
          fullNameReceiver: order.receiverFullName,
          phoneReceiver: order.receiverPhone,
        },
        plan: {
          titleOfPlan: order.subscription.plan.title,
          priceOfPlan: order.subscription.plan.price,
          statusOfPlan: order.subscription.plan.status,
          imageOfPlan: order.subscription.plan.image,
        },
        user: {
          avatar: order.subscription.user.avatar,
          cpf: order.subscription.user.cpf,
        },
      };

      return formattedData;
    });

    return {
      data: formattedOrdersOfUser,
      status: HttpStatus.OK,
      message: 'Pedidos do usuário retornados com sucesso.',
    };
  }
}

export default UserService;
