import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateSessionDTO } from '../dtos/create-session.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async execute({ email, password }: CreateSessionDTO) {
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
