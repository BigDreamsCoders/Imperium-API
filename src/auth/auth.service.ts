import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { TokenDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user: User = await this.userService.findByEmail(
      email,
      'user.password',
    );
    if (!user) {
      return null;
    }
    return user.comparePassword(password) ? user : null;
  }

  async login(user: any): Promise<TokenDTO> {
    const { email, id } = user;
    return {
      token: this.jwtService.sign({ email, sub: id }),
    };
  }
}
