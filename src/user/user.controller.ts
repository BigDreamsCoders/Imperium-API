import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ACGuard, UseRoles } from 'nest-access-control';
import { FileService } from '../file/file.service';
import { GenderService } from '../gender/gender.service';
import { AuthGuard } from '../guards/auth.guard';
import { JwtGuard } from '../guards/jwt.guard';
import { MembershipService } from '../membership/membership.service';
import { RoleService } from '../role/role.service';
import { Privileges } from '../utilities/costants';
import { NewUserDTO } from './user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly membershipService: MembershipService,
    private readonly fileService: FileService,
    private readonly genderService: GenderService,
    private readonly roleService: RoleService,
  ) {}

  @UseGuards(JwtGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: Privileges.RESOURCES.ROLES,
    action: Privileges.ACTION.R,
  })
  @Get()
  async getUser(@Req() req: Request) {
    return req.user;
  }

  @HttpCode(201)
  @Post('')
  async create(@Body() newUserDTO: NewUserDTO) {
    const state = await this.membershipService.findStateByID(
      newUserDTO.membership.state,
    );
    if (!state.success) throw new BadRequestException(state.message);

    const type = await this.membershipService.findTypeByID(
      newUserDTO.membership.type,
    );
    if (!type.success) throw new BadRequestException(type.message);

    const gender = await this.genderService.findById(newUserDTO.genderId);
    if (!gender.success) throw new BadRequestException(gender.message);

    const role = await this.roleService.findByID(newUserDTO.roleId);
    if (!role.success) throw new BadRequestException(role.message);

    delete newUserDTO.membership;
    try {
      const userResponse = await this.userService.create({
        ...newUserDTO,
        membershipState: state.membership,
        membershipType: type.membership,
        gender: gender.gender,
        role: role.role,
      });
      return userResponse.user;
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
