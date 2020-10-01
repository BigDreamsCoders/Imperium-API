import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Post,
  Put,
} from '@nestjs/common';
import { PrivilegeService } from '../privilege/privilege.service';
import { RoleDeleteDTO, RoleDTO, RoleUpdateDTO } from './role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly privilegeService: PrivilegeService,
  ) {}

  @Get('')
  async findAll() {
    console.log(await this.privilegeService.findAll());
    return this.roleService.findAll();
  }

  @HttpCode(201)
  @Post('')
  async create(@Body() roleDTO: RoleDTO) {
    const roleByName = await this.roleService.findByName(roleDTO.name);
    if (roleByName.success) {
      throw new BadRequestException('Role already exists');
    }
    const role = await this.roleService.create(roleDTO);
    if (!role) {
      throw new InternalServerErrorException();
    }
    delete role.success;
    return role;
  }

  @Put('')
  async update(@Body() roleDTO: RoleUpdateDTO) {
    const roleByID = await this.roleService.findByID(roleDTO.id);
    if (!roleByID.success) {
      throw new BadRequestException('Role does not exists');
    }
    const role = await this.roleService.update(roleByID.role, roleDTO);
    if (!role.role) {
      throw new InternalServerErrorException();
    }
    delete role.success;
    return role;
  }

  @Delete('')
  async remove(@Body() roleDTO: RoleDeleteDTO) {
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
}
