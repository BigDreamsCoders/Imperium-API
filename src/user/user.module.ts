import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { MembershipModule } from '../membership/membership.module';
import { MembershipService } from '../membership/membership.service';
import { FileModule } from '../file/file.module';
import { FileService } from '../file/file.service';
import { GenderModule } from '../gender/gender.module';
import { GenderService } from '../gender/gender.service';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MembershipModule,
    FileModule,
    GenderModule,
    RoleModule,
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [
    UserService,
    MembershipService,
    FileService,
    GenderService,
    RoleService,
  ],
})
export class UserModule {}
