import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Privilege, Role } from '../entities/role.entity';
import { PrivilegeModule } from '../privilege/privilege.module';
import { PrivilegeService } from '../privilege/privilege.service';
import { RolePrivilegeModule } from '../rolePrivilege/role-privilege.module';
import { RolePrivilegeService } from '../rolePrivilege/role-privilege.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    PrivilegeModule,
    RolePrivilegeModule,
  ],
  exports: [RoleService, TypeOrmModule],
  controllers: [RoleController],
  providers: [RoleService, PrivilegeService, RolePrivilegeService],
})
export class RoleModule {}
