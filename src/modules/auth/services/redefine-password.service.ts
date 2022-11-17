import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { isAfter } from 'date-fns';
import { PrismaService } from '../../prisma';
import RedefinePasswordDTO from '../dtos/redefine-password.dto';
import SendEmailConfirmRecoverPasswordService from './send-email-confirm-recover-password.service';

@Injectable()
class RedefinePasswordService {
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
      throw new NotFoundException('This token does not exists in database');
    }

    const user = await this.prismaService.user.findFirst({
      where: { id: tokenRedefinePassword.users_id },
    });

    if (!user) {
      throw new NotFoundException(
        'This user of this token does not exists in database',
      );
    }

    const tokens = await this.prismaService.usersToken.findMany({
      where: { users_id: user.id },
    });

    tokens.map((otherToken) => {
      if (
        !isAfter(tokenRedefinePassword.created_at, otherToken.created_at) &&
        otherToken.token != token
      ) {
        throw new UnauthorizedException('This token does not active');
      }
    });

    if (!isAfter(new Date(tokenRedefinePassword.expires_in), new Date())) {
      throw new UnauthorizedException('This token has expired');
    }

    if (tokenRedefinePassword.used || tokenRedefinePassword.used_in !== null) {
      throw new UnauthorizedException('This token was used previously');
    }

    if (password !== confirmPassword) {
      throw new UnauthorizedException('This passwords repassed does not match');
    }

    const newPasswordIsEqualLastPassword = await compare(
      password,
      user.password,
    );

    if (newPasswordIsEqualLastPassword) {
      throw new UnauthorizedException(
        'This new password is equal the last password, try other',
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

    return updatedUser;
  }
}

export default RedefinePasswordService;
