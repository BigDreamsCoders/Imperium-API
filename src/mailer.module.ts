import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            service: configService.get<string>('EMAIL_SERVICE'),
            auth: {
              user: configService.get<string>('EMAIL_USER'),
              pass: configService.get<string>('EMAIL_PASS'),
            },
          },
          preview: true,
          template: {
            dir: path.join(__dirname, 'templates/pages/'),
            adapter: new HandlebarsAdapter(),
          },
          defaults: {
            from: 'No replay <no-replay@imperium>',
          },
        };
      },
    }),
  ],
})
export class MyMailerModule {}
