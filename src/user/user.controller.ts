import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGuard } from '../guards/jwt.guard';
import { NewUserDTO } from './user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getUser(@Req() req: Request) {
    return req.user;
  }
  @Post()
  async create(@Body() newUserDTO: NewUserDTO) {}
}
