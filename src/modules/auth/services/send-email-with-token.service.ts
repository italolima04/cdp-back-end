import { Injectable, NotFoundException } from '@nestjs/common';
import { addDays } from 'date-fns';
import { PrismaService, UsersToken } from '../../prisma';
import SendEmailWithTokenDTO from '../dtos/send-email-with-token.dto';
import SendEmailWithTokenForRecoverPasswordService from './send-email-with-token-for-recover-password.service';

@Injectable()
class SendEmailWithTokenService {
  constructor(
    private mail: SendEmailWithTokenForRecoverPasswordService,
    private prismaService: PrismaService,
  ) {}

  async execute({ email }: SendEmailWithTokenDTO): Promise<UsersToken> {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('This user does not exists in database');
    }

    const lastToken = await this.prismaService.usersToken.findFirst({
      where: { users_id: user.id },
      orderBy: { created_at: 'desc' },
    });

    if (lastToken && !lastToken.used && lastToken.used_in === null) {
      await this.mail.execute({ user, token: lastToken.token });

      return lastToken;
    } else {
      const expires_in = addDays(new Date(), 7);

      const token = await this.prismaService.usersToken.create({
        data: { users_id: user.id, expires_in: expires_in },
      });
      1;

      await this.mail.execute({ user, token: token.token });

      return token;
    }
  }
}

export default SendEmailWithTokenService;
