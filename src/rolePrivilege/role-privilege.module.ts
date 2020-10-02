import { RolePrivilegeService } from './role-privilege.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePrivilege } from '../entities/role.entity';

@Module({
  exports: [RolePrivilegeService],
  imports: [TypeOrmModule.forFeature([RolePrivilege])],
  controllers: [],
  providers: [RolePrivilegeService],
})
export class RolePrivilegeModule {}
