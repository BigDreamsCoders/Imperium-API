import { PrivilegeService } from './privilege.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Privilege } from '../entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Privilege])],
  exports: [PrivilegeService, TypeOrmModule],
  providers: [PrivilegeService],
})
export class PrivilegeModule {}
