import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Query,
  Post,
  Req,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AuthService } from '../auth/auth.service';
import { EmailService } from '../email/email.service';
import { FileService } from '../file/file.service';
import { GenderService } from '../gender/gender.service';
import { AuthGuard } from '../guards/auth.guard';
import { JwtGuard } from '../guards/jwt.guard';
import { MembershipService } from '../membership/membership.service';
import { RoleService } from '../role/role.service';
import { Privileges } from '../utilities/costants';
import { NewUserDTO, UpdatePasswordDTO } from './user.dto';
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
    private readonly emailService: EmailService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('/gender')
  async getGenders() {
    return this.genderService.findAll();
  }

  @UseGuards(JwtGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: Privileges.RESOURCES.ROLES,
    action: Privileges.ACTION.R,
  })
  @Get('/me')
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
      const userResponse = await this.userService.create(
        {
          ...newUserDTO,
          membershipState: state.membership,
          membershipType: type.membership,
          gender: gender.gender,
          role: role.role,
        },
        (dest: string, name: string, pass: string) => {
          this.emailService.sendPassword(dest, name, pass);
        },
      );

      return userResponse.user;
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  @HttpCode(200)
  @UseGuards(JwtGuard)
  @Patch('/password')
  async updatePassword(
    @Req() req: any,
    @Body() updatePasswordDTO: UpdatePasswordDTO,
  ) {
    const user = await this.userService.validateUser(
      req.user.email,
      updatePasswordDTO.password,
    );
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const response = await this.userService.updatePassword(
      user,
      updatePasswordDTO.newPassword,
    );
    if (!response.success)
      throw new InternalServerErrorException(response.message);
    return { message: response.message };
  }

  @HttpCode(200)
  @UseGuards(JwtGuard)
  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    const userResponse = await this.userService.findById(id);
    if (!userResponse.success)
      return new BadRequestException(userResponse.message);
    const userRemoved = await this.userService.deleteUser(userResponse.user);
    if (!userRemoved.success)
      return new InternalServerErrorException(userRemoved.message);
    return { message: userRemoved.message };
  }

  @UseGuards(JwtGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: Privileges.RESOURCES.USERS,
    action: Privileges.ACTION.R,
    possession: Privileges.POSSESSION.OWN,
  })
  @Get('/:id*?')
  async getUsers(
    @Param('id') id: number,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.userService.find(id, limit, page);
  }
}
