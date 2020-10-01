import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Privilege, Role } from '../entities/role.entity';
import { PrivilegeModule } from '../privilege/privilege.module';
import { PrivilegeService } from '../privilege/privilege.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Privilege]), PrivilegeModule],
  controllers: [RoleController],
  providers: [RoleService, PrivilegeService],
})
export class RoleModule {}
