import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { isAfter } from 'date-fns';
import { PrismaService } from '../../prisma';

@Injectable()
export class VerifyTokenService {
  constructor(private prismaService: PrismaService) {}

  async execute(token: string): Promise<boolean> {
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

    if (!user) {
      throw new NotFoundException(
        'O usuário deste token não existe no nosso banco de dados',
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
        throw new UnauthorizedException('Este token não está ativo');
      }
    });

    if (!isAfter(new Date(tokenRedefinePassword.expires_in), new Date())) {
      throw new UnauthorizedException('Este token expirou');
    }

    if (tokenRedefinePassword.used || tokenRedefinePassword.used_in !== null) {
      throw new UnauthorizedException('Este token já foi usado anteriormente');
    }

    return true;
  }
}
