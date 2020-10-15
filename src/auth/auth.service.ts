import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../user/user.service';
import { TokenDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: any): Promise<TokenDTO> {
    const { email, id } = user;
    return {
      email,
      token: this.jwtService.sign({ email, sub: id }),
    };
  }
}
