import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { RoleResponse } from './interfaces/response.interface';
import { RoleDeleteDTO, RoleDTO, RoleUpdateDTO } from './role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findByID(id: string): Promise<RoleResponse> {
    const response: RoleResponse = {
      message: 'Role not found',
      success: false,
      role: undefined,
    };

    const role = await this.roleRepository.findOne({
      where: { id: id.toUpperCase() },
    });

    if (!role) return response;

    response.success = true;
    response.role = role;
    response.message = 'Role found';

    return response;
  }

  async findByName(name: string): Promise<RoleResponse> {
    const response: RoleResponse = {
      message: 'Role not found',
      success: false,
      role: undefined,
    };

    const role = await this.roleRepository.findOne({
      where: { name: name.toUpperCase() },
    });
    if (!role) return response;

    response.success = true;
    response.role = role[0];
    response.message = 'Role found';

    return response;
  }

  async create(roleDTO: RoleDTO): Promise<RoleResponse> {
    const response: RoleResponse = {
      message: 'Role could not be saved',
      success: false,
      role: undefined,
    };

    const role = new Role();
    role.name = roleDTO.name.toUpperCase();
    try {
      const savedRole = await this.roleRepository.save(role);
      response.message = 'Role created';
      response.success = true;
      response.role = savedRole;
      return response;
    } catch (e) {
      return response;
    }
  }

  async update(role: Role, roleDTO: RoleUpdateDTO) {
    const response: RoleResponse = {
      message: 'Role could not be saved',
      success: false,
      role: undefined,
    };
    role.name = roleDTO.name;
    try {
      const updatedRole = await this.roleRepository.save({
        ...role,
        name: roleDTO.name,
      });
      response.success = true;
      response.role = updatedRole;
      response.message = 'Role updated';
      return response;
    } catch (e) {
      console.error(e);
      return response;
    }
  }

  async remove(role: Role): Promise<RoleResponse> {
    const response: RoleResponse = {
      message: 'Role could not be deleted',
      success: false,
      role: undefined,
    };
    const roleDeleted = await this.roleRepository.remove(role);
    if (!roleDeleted) return response;
    response.message = 'Role deleted';
    response.success = true;
    response.role = roleDeleted;
    return response;
  }
}
