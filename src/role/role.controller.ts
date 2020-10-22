import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '../entities/role.entity';
import { PrivilegeService } from '../privilege/privilege.service';
import { RoleResponse } from './interfaces/response.interface';
import { RoleDeleteDTO, RoleDTO, RoleUpdateDTO } from './role.dto';
import { RoleService } from './role.service';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly privilegeService: PrivilegeService,
  ) {}

  @HttpCode(200)
  @Get('/privileges/:id*?')
  async findPrivileges(
    @Param('id') id: number,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return await this.privilegeService.find(id, limit, page);
  }

  @HttpCode(201)
  @Post('')
  async create(@Body() roleDTO: RoleDTO): Promise<RoleResponse> {
    const roleByName = await this.roleService.findByName(roleDTO.name);
    if (roleByName.success) {
      throw new BadRequestException('Role already exists');
    }

    const privileges = await this.privilegeService.findByIds(
      roleDTO.privileges,
    );
    if (privileges.length < roleDTO.privileges.length)
      throw new BadRequestException('One or more privileges do not exists');

    const role = await this.roleService.create(roleDTO, privileges);
    if (!role) {
      throw new InternalServerErrorException();
    }

    delete role.success;
    return role;
  }

  @HttpCode(200)
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() roleDTO: RoleUpdateDTO,
  ): Promise<RoleResponse> {
    const roleByID = await this.roleService.findByID(id);
    if (!roleByID.success) {
      throw new BadRequestException('Role does not exists');
    }
    const privileges = await this.privilegeService.findByIds(
      roleDTO.privileges,
    );
    if (privileges.length !== roleDTO.privileges.length)
      throw new BadRequestException('One or more privileges do not exists');
    const role = await this.roleService.update(
      roleByID.role,
      roleDTO,
      privileges,
    );
    if (!role.role) {
      throw new InternalServerErrorException();
    }
    delete role.success;
    return role;
  }

  @HttpCode(200)
  @Delete('')
  async remove(@Body() roleDTO: RoleDeleteDTO): Promise<RoleResponse> {
    const roleByID = await this.roleService.findByID(roleDTO.id);
    if (!roleByID.success) {
      throw new BadRequestException('Role does not exists');
    }

    const role = await this.roleService.remove(roleByID.role);
    if (!role.role) {
      throw new InternalServerErrorException();
    }

    delete role.success;
    return role;
  }

  @HttpCode(200)
  @Get('/:id*?')
  async find(@Param('id') id: number): Promise<Role[] | Role> {
    const response = await this.roleService.find(id);
    if ('success' in response) {
      if (!response.success) {
        throw new BadRequestException('Role not found');
      }
      return response.role;
    }
    return response;
  }
}
