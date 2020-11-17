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
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ACGuard, UseRoles } from 'nest-access-control';
import { BuildingService } from '../building/building.service';
import { EmailService } from '../email/email.service';
import { BuildingEntranceAction } from '../entities/building.entity';
import { User } from '../entities/user.entity';
import { FileDTO } from '../file/file.dto';
import { FileService } from '../file/file.service';
import { GenderService } from '../gender/gender.service';
import { AuthGuard } from '../guards/auth.guard';
import { JwtGuard } from '../guards/jwt.guard';
import { MembershipService } from '../membership/membership.service';
import { RoleService } from '../role/role.service';
import { Privileges } from '../utilities/costants';
import { generateTempPassword } from '../utilities/functions';
import {
  UserDTO,
  UpdatePasswordDTO,
  UpdateUser,
  ResetPasswotdDTO,
} from './user.dto';
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
    private readonly buildingService: BuildingService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('/gender')
  async getGenders() {
    return this.genderService.findAll();
  }

  @UseGuards(JwtGuard, AuthGuard, ACGuard)
  @Get('/me')
  async getUser(@Req() req: any) {
    const { id } = req.user;
    const user = await this.userService.find(id, undefined, undefined);
    return user;
  }

  @HttpCode(201)
  @Post('')
  async create(@Body() newUserDTO: UserDTO) {
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
  @Patch('/reset/password')
  async restPassword(@Body() resetPassword: ResetPasswotdDTO) {
    const user = await this.userService.findByEmail(resetPassword.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const tempPassword = generateTempPassword();
    const userResponse = await this.userService.updatePassword(
      user,
      tempPassword,
    );
    if (!userResponse.success) {
      throw new InternalServerErrorException();
    }
    const { email, firstName, lastName } = userResponse.user;
    await this.emailService.sendResetPassword(
      email,
      `${firstName} ${lastName}`,
      tempPassword,
    );
  }

  @HttpCode(200)
  @Patch('/:id')
  async updateUser(@Param('id') id: number, @Body() user: UpdateUser) {
    const userResponse = await this.userService.findById(id);
    if (!userResponse.success)
      return new BadRequestException(userResponse.message);
    const roleResponse = await this.roleService.findByID(user.roleId);
    if (!roleResponse.role)
      return new BadRequestException(roleResponse.message);
    const genderReponse = await this.genderService.findById(user.genderId);
    if (!genderReponse.gender)
      return new BadRequestException(genderReponse.message);
    try {
      const response = await this.userService.updateUserBasicInfo(
        userResponse.user,
        genderReponse.gender,
        roleResponse.role,
        user,
      );
      return response.message;
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  @HttpCode(200)
  @Put('file/:id')
  async updateUserFile(@Param('id') id: number, @Body() file: FileDTO) {
    const fileResponse = await this.fileService.findById(id);
    if (!fileResponse.success)
      return new BadRequestException(fileResponse.message);
    const fileUpdatedResponse = await this.fileService.updateFile(
      fileResponse.file,
      file,
    );
    if (!fileUpdatedResponse.success)
      return new InternalServerErrorException(fileUpdatedResponse.message);
    return { msg: fileUpdatedResponse.message };
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

  @UseGuards(JwtGuard)
  @Put('/entrance/:id')
  async markBuildingEntrance(@Param('id') userId: number) {
    const userResponse = await this.userService.find(
      userId,
      undefined,
      undefined,
    );
    if (!userResponse) throw new BadRequestException('Not found');
    const buildingActionResponse = await this.buildingService.findBuildingEntranceAction(
      (<User>userResponse).isIdentified ? 2 : 1,
    );
    if (!buildingActionResponse.success)
      throw new InternalServerErrorException();
    const buildEntranceResponse = await this.buildingService.createBuildingEntrance(
      <BuildingEntranceAction>buildingActionResponse.action,
      <User>userResponse,
    );
    if (!buildEntranceResponse.success)
      throw new InternalServerErrorException();

    const userUpdated = await this.userService.updateIdentifiedStatus(
      <User>userResponse,
    );
    if (!userUpdated) throw new InternalServerErrorException();
    return;
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
