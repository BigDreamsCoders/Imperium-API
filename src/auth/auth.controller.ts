import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { Privileges } from '../utilities/costants';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: Privileges.RESOURCES.ADMIN,
    action: Privileges.ACTION.R,
    possession: Privileges.POSSESSION.OWN,
  })
  @Post('admin/login')
  async loginAdmin(@Req() req: Request) {
    return this.authService.login(req.user);
  }
}
