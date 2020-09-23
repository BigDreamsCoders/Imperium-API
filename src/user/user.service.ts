import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async findByEmail(email: string, select: string = ''): Promise<User> {
    return await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .addSelect(select)
      .getOne();
  }
}
