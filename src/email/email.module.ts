import { EmailService } from './email.service';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [MailerModule],
  controllers: [],
  providers: [EmailService],
})
export class EmailModule {}
