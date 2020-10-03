import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { File } from '../entities/file.entity';
import { Membership } from '../entities/membership.entity';
import { User } from '../entities/user.entity';
import { UserProcessed, UserResponse } from './interface/response.interface';

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

  async create(userProcessed: UserProcessed): Promise<UserResponse> {
    const response: UserResponse = {
      message: 'User not created',
      success: false,
      user: undefined,
    };
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const membership = new Membership();
      membership.membershipState = userProcessed.membershipState;
      membership.membershipType = userProcessed.membershipType;

      const file = new File();
      file.weight = userProcessed.file.weight;
      file.height = userProcessed.file.height;

      const user = new User();
      user.email = userProcessed.email;
      user.firstName = userProcessed.firstName;
      user.lastName = userProcessed.lastName;
      user.gender = userProcessed.gender;
      user.file = file;
      user.membership = membership;
      user.role = userProcessed.role;
      user.birthday = new Date(userProcessed.birthday);
      user.setPassword(userProcessed.password);

      const userSaved = await this.userRepository.save(user);
      console.log(userSaved);
      if (!userSaved) throw Error(response.message);

      response.success = true;
      response.message = 'User created';
      response.user = userSaved;

      await queryRunner.commitTransaction();
      return response;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw Error(response.message);
    } finally {
      await queryRunner.release();
    }
  }
}
