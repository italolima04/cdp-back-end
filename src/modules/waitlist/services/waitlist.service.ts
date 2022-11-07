import { PrismaService } from '@/database/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateWaitlistDTO from '../dtos/create-waitlist.dto';

@Injectable()
export class WaitlistService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}
  async create(createWaitlistDTO: CreateWaitlistDTO) {
    try {
      const { email } = createWaitlistDTO;

      const existsRegisterOnWaitlist = await this.prisma.waitList.findUnique({
        where: {
          email,
        },
      });

      if (existsRegisterOnWaitlist) {
        throw new HttpException(
          `Este email já existe foi adicionado na nossa lista de espera. Sabemos que a ansiedade é grande, mas iremos entrar em contato assim que o produto estiver disponível.`,
          HttpStatus.CONFLICT,
        );
      }

      const createdRegisterOnWaitlist = await this.prisma.waitList.create({
        data: {
          ...createWaitlistDTO,
        },
      });

      if (!createdRegisterOnWaitlist) {
        throw new HttpException(
          `Erro ao adicionar registro na lista de espera.`,
          HttpStatus.BAD_REQUEST,
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
    } catch (error) {
      if (error) throw error;
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // findAll() {
  //   return `This action returns all waitlist`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} waitlist`;
  // }

  // update(id: number, updateWaitlistDto: UpdateWaitlistDto) {
  //   return `This action updates a #${id} waitlist`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} waitlist`;
  // }
}
