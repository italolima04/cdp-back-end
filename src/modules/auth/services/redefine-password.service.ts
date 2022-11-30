import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '../../prisma';
import User from '../../user/entities/user.entity';
import RedefinePasswordDTO from '../dtos/redefine-password.dto';
import SendEmailConfirmRecoverPasswordService from './send-email-confirm-recover-password.service';

@Injectable()
export default class RedefinePasswordService {
  constructor(
    private prismaService: PrismaService,
    private mail: SendEmailConfirmRecoverPasswordService,
  ) {}

  async execute({
    token,
    password,
    confirmPassword,
  }: RedefinePasswordDTO): Promise<User> {
    const tokenRedefinePassword = await this.prismaService.usersToken.findFirst(
      {
        where: { token },
      },
    );

    if (!tokenRedefinePassword) {
      throw new NotFoundException(
        'Este token não existe no nosso banco de dados',
      );
    }

    const user = await this.prismaService.user.findFirst({
      where: { id: tokenRedefinePassword.users_id },
    });

    if (password !== confirmPassword) {
      throw new UnauthorizedException('As senhas não são iguais');
    }

    const newPasswordIsEqualLastPassword = await compare(
      password,
      user.password,
    );

    if (newPasswordIsEqualLastPassword) {
      throw new UnauthorizedException(
        'A nova senha não pode ser igual a anterior, tente outra',
      );
    }

    const passwordHash = await hash(password, 12);

    const updatedUser = await this.prismaService.user.update({
      data: { password: passwordHash },
      where: { id: user.id },
    });

    await this.prismaService.usersToken.update({
      where: { id: tokenRedefinePassword.id },
      data: {
        ...tokenRedefinePassword,
        used: true,
        used_in: new Date(),
      },
    });

    await this.mail.execute({ user });

    delete updatedUser.password;

    return updatedUser;
  }
}
