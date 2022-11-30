import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import EmailWithUserAndToken from '../dtos/email-with-user-token.dto';

@Injectable()
class SendEmailWithTokenForRecoverPasswordService {
  constructor(private mailer: MailerService) {}

  async execute({ user, token }: EmailWithUserAndToken): Promise<void> {
    await this.mailer
      .sendMail({
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Token para recuperar a senha',
        template: 'sendToken',
        context: {
          firstName: user.firstName,
          token: token,
        },
      })
      .catch((error) => {
        console.log('ERROR SEND EMAIL WITH TOKEN: ' + error);
      });
  }
}

export default SendEmailWithTokenForRecoverPasswordService;
