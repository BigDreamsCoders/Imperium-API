import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { File } from '../entities/file.entity';
import { Membership } from '../entities/membership.entity';
import { User } from '../entities/user.entity';
import { generateTempPassword } from '../utilities/functions';
import {
  PaginatedUser,
  UserProcessed,
  UserResponse,
} from './interface/response.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async validateUser(email: string, password: string) {
    const user: User = await this.findByEmail(email, 'user.password');
    if (!user) {
      return null;
    }
    return user.comparePassword(password) ? user : null;
  }

  async findByEmail(email: string, select: string = ''): Promise<User> {
    this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
    const user = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .addSelect(select)
      .getOne();
    if (!user) return null;

    user.role = await this.connection
      .createQueryBuilder()
      .relation(User, 'role')
      .of(user)
      .loadOne();
    return user;
  }

  async findById(id: number): Promise<UserResponse> {
    const response: UserResponse = {
      message: 'User not found',
      success: false,
      user: undefined,
    };
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return response;
    response.message = 'User found';
    response.success = true;
    response.user = user;
    return response;
  }

  async find(
    id: number,
    limit: number,
    page: number,
  ): Promise<User[] | User | PaginatedUser> {
    if (id)
      return this.userRepository.findOne(id, {
        relations: [
          'membership',
          'membership.membershipState',
          'membership.membershipType',
          'role',
          'gender',
          'file',
        ],
      });
    if (!limit || page === undefined)
      return this.userRepository.find({
        relations: ['membership', 'membership.membershipState'],
      });
    const [user, count] = await this.userRepository.findAndCount({
      take: limit,
      skip: page * limit,
      relations: ['membership', 'membership.membershipState'],
    });
    return {
      count,
      data: user,
    };
  }

  async create(
    userProcessed: UserProcessed,
    mailCallback: any,
  ): Promise<UserResponse> {
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

      const pass = generateTempPassword();
      const user = new User();
      user.email = userProcessed.email;
      user.firstName = userProcessed.firstName;
      user.lastName = userProcessed.lastName;
      user.gender = userProcessed.gender;
      user.file = file;
      user.membership = membership;
      user.role = userProcessed.role;
      user.birthday = new Date(userProcessed.birthday);
      user.password = pass;
      user.setPassword(user.password);

      const userSaved = await this.userRepository.save(user);
      if (!userSaved) throw Error(response.message);

      await mailCallback(user.email, user.firstName, pass);

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

  async updatePassword(user: User, newPassword: string): Promise<UserResponse> {
    const response: UserResponse = {
      message: 'User not created',
      success: false,
      user: undefined,
    };
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      user.setPassword(newPassword);
      await this.userRepository.save(user);
      await queryRunner.commitTransaction();
      response.message = 'Password updated';
      response.success = true;
      response.user = user;
      return response;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw Error(response.message);
    } finally {
      await queryRunner.release();
    }
  }

  async deleteUser(user: User): Promise<UserResponse> {
    const response: UserResponse = {
      message: 'User not found',
      success: false,
      user: undefined,
    };
    const userRemoved = await this.userRepository.remove(user);
    if (!userRemoved) return response;
    response.message = 'User deleted';
    response.success = true;
    response.user = userRemoved;
    return response;
  }
}
