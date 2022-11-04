import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateSessionDTO } from '../dtos/create-session.dto';
import { BCryptHashProvider } from '../providers/HashProvider/implementations/BCryptHashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    @Inject(BCryptHashProvider) private readonly HashProvider: IHashProvider,
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

    const verifyUserPassword = await this.HashProvider.compareHash(
      password,
      user.password,
    );

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
