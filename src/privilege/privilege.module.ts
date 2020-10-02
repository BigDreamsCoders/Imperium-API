import { PrivilegeService } from './privilege.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Privilege } from '../entities/role.entity';

@Module({
  exports: [PrivilegeService],
  imports: [TypeOrmModule.forFeature([Privilege])],
  providers: [PrivilegeService],
})
export class PrivilegeModule {}
