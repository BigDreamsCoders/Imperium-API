import { RolePrivilegeService } from './role-privilege.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePrivilege } from '../entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePrivilege])],
  exports: [RolePrivilegeService, TypeOrmModule],
  controllers: [],
  providers: [RolePrivilegeService],
})
export class RolePrivilegeModule {}
