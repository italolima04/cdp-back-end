import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailerConfig: MailerOptions = {
  template: {
    dir: process.cwd() + '/src/templates/',
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      strict: true,
    },
  },
  transport: {
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: 'naoresponda@suatramacriativa.com',
      pass: 'foconofoco04',
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
};
