import { PrismaService } from '@Prisma/index';
import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import CreateWaitlistDTO from '../dtos/create-waitlist.dto';

@Injectable()
export class WaitlistService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async create(createWaitlistDTO: CreateWaitlistDTO) {
    const { email } = createWaitlistDTO;

    const existsRegisterOnWaitlist = await this.prisma.waitList.findUnique({
      where: {
        email,
      },
    });

    if (existsRegisterOnWaitlist) {
      throw new ConflictException(
        'Este email já existe foi adicionado na nossa lista de espera. Sabemos que a ansiedade é grande, mas iremos entrar em contato assim que o produto estiver disponível.',
      );
    }

    const createdRegisterOnWaitlist = await this.prisma.waitList.create({
      data: {
        ...createWaitlistDTO,
      },
    });

    if (!createdRegisterOnWaitlist) {
      throw new BadRequestException(
        'Erro ao adicionar registro na lista de espera.',
      );
    }

    const mail = {
      to: createdRegisterOnWaitlist.email,
      from: `${process.env.EMAIL}`,
      subject: 'Você já está na nossa lista de espera :)',
      template: 'welcome-waitlist',
      context: {
        user: createdRegisterOnWaitlist.name,
        city: createdRegisterOnWaitlist.city,
        state: createdRegisterOnWaitlist.state,
      },
    };

    await this.mailerService.sendMail(mail);

    return {
      data: createdRegisterOnWaitlist,
      status: HttpStatus.CREATED,
      message: 'Registro adicionado a lista de espera.',
    };
  }
}
