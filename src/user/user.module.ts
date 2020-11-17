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
import { EmailModule } from '../email/email.module';
import { EmailService } from '../email/email.service';
import { BuildingModule } from '../building/building.module';
import { BuildingService } from '../building/building.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MembershipModule,
    FileModule,
    GenderModule,
    RoleModule,
    EmailModule,
    BuildingModule,
  ],
  exports: [TypeOrmModule, UserService],
  controllers: [UserController],
  providers: [
    UserService,
    MembershipService,
    FileService,
    GenderService,
    RoleService,
    EmailService,
    BuildingService,
  ],
})
export class UserModule {}
