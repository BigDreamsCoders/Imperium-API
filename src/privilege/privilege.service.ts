import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Privilege } from '../entities/role.entity';
import { PaginatedPrivilege } from './interfaces/privilege.interfaces';

@Injectable()
export class PrivilegeService {
  constructor(
    @InjectRepository(Privilege)
    private readonly privilegeRepository: Repository<Privilege>,
  ) {}

  async find(
    id: number,
    limit: number,
    page: number,
  ): Promise<Privilege | Privilege[] | PaginatedPrivilege> {
    if (id) {
      return this.privilegeRepository.findOne(id);
    }
    if (limit === undefined || page === undefined)
      return this.privilegeRepository.find();
    const [privileges, count] = await this.privilegeRepository.findAndCount({
      take: limit,
      skip: page * limit,
      order: { id: 'ASC' },
    });
    return {
      count,
      data: privileges,
    };
  }

  async findAll() {
    return await this.privilegeRepository.find();
  }

  async findByIds(ids: number[]) {
    return await this.privilegeRepository.findByIds(ids);
  }
}
