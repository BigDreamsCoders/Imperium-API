import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePrivilege } from '../entities/role.entity';

@Injectable()
export class RolePrivilegeService {
  constructor(
    @InjectRepository(RolePrivilege)
    private readonly rolePrivilegeRepository: Repository<RolePrivilege>,
  ) {}

  async findAll(): Promise<RolePrivilege[]> {
    return await this.rolePrivilegeRepository.find({
      relations: ['role', 'privilege'],
    });
  }

  async findByRoleId(id: string): Promise<RolePrivilege[]> {
    return await this.rolePrivilegeRepository.find({
      where: { role: id },
      relations: ['role', 'privilege'],
    });
  }
}
