import { FileModule } from './../file/file.module';
import { MembershipModule } from './../membership/membership.module';
import { GenderModule } from './../gender/gender.module';
import { RolePrivilegeModule } from './../rolePrivilege/role-privilege.module';
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
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guards/auth.guard';

@Module({
  imports: [
    FileModule,
    MembershipModule,
    GenderModule,
    RolePrivilegeModule,
    PrivilegeModule,
    RoleModule,
    AuthModule,
    UserModule,
    ConfModule,
    DatabaseModule,
    AccControlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
