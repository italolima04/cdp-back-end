import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { PrismaService } from '../../prisma';

import { CreateSessionDTO } from '../dtos/create-session.dto';

export type IResponseLoginDTO = {
  token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async authenticate({
    email,
    password,
  }: CreateSessionDTO): Promise<IResponseLoginDTO> {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(
        'Usuário com e-mail não encontrado em nossa base de dados',
      );
    }

    const verifyUserPassword = await compare(password, user.password);

    if (!verifyUserPassword) {
      throw new UnauthorizedException('Combinação de e-mail/senha incorreta');
    }

    return {
      token: this.jwtService.sign({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }),
    };
  }
}
