import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import SendEmailConfirmPasswordDTO from '../dtos/send-mail-confirm-password';

@Injectable()
class SendEmailConfirmRecoverPasswordService {
  constructor(private mailer: MailerService) {}

  async execute({ user }: SendEmailConfirmPasswordDTO): Promise<void> {
    await this.mailer
      .sendMail({
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Confirmação de senha redefinida com sucesso',
        template: 'confirmRedefinePassword',
        context: {
          firstName: user.firstName,
        },
      })
      .catch((error) => {
        console.log('ERROR SEND EMAIL WITH TOKEN: ' + error);
      });
  }
}

export default SendEmailConfirmRecoverPasswordService;
