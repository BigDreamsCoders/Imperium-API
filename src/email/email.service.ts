import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  async sendPassword(dest: string, name: string, pass: string) {
    return this.mailService.sendMail({
      to: dest,
      subject: 'Termina de configurar tu contraseña',
      template: 'temp.hbs',
      context: {
        name,
        pass,
      },
    });
  }

  async sendResetPassword(dest: string, name: string, pass: string) {
    return this.mailService.sendMail({
      to: dest,
      subject: 'Nueva contraseña temporal',
      template: 'newTemp.hbs',
      context: {
        name,
        pass,
      },
    });
  }
}
