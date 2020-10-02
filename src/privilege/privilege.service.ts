import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Privilege } from '../entities/role.entity';

@Injectable()
export class PrivilegeService {
  constructor(
    @InjectRepository(Privilege)
    private readonly privilegeRepository: Repository<Privilege>,
  ) {}

  async findAll() {
    return await this.privilegeRepository.find();
  }
}
