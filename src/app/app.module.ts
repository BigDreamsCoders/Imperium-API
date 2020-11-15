import { RoutineModule } from './../routine/routine.module';
import { WorkstationModule } from './../workstation/workstation.module';
import { EmailModule } from './../email/email.module';
import { FileModule } from './../file/file.module';
import { MembershipModule } from './../membership/membership.module';
import { GenderModule } from './../gender/gender.module';
import { PrivilegeModule } from './../privilege/privilege.module';
import { RoleModule } from './../role/role.module';
import { AuthModule } from './../auth/auth.module';
import { UserModule } from './../user/user.module';
import { DatabaseModule } from '../database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccControlModule } from '../access-control.module';
import { ConfModule } from '../config.module';
import { MyMailerModule } from '../mailer.module';

@Module({
  imports: [
    RoutineModule,
    WorkstationModule,
    EmailModule,
    FileModule,
    MembershipModule,
    GenderModule,
    PrivilegeModule,
    RoleModule,
    AuthModule,
    UserModule,
    ConfModule,
    DatabaseModule,
    AccControlModule,
    MyMailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
