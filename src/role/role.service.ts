import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Privilege, Role } from '../entities/role.entity';
import { RoleResponse } from './interfaces/response.interface';
import { RoleDTO, RoleUpdateDTO } from './role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly connection: Connection,
  ) {}

  async find(id: number): Promise<RoleResponse | Role[]> {
    if (id) {
      return await this.findByID(id);
    }
    return await this.roleRepository.find({
      relations: ['privilege'],
      order: { id: 'ASC' },
    });
  }

  async findByID(id: number): Promise<RoleResponse> {
    const response: RoleResponse = {
      message: 'Role not found',
      success: false,
      role: undefined,
    };

    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['privilege'],
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

  async create(
    roleDTO: RoleDTO,
    privileges: Privilege[],
  ): Promise<RoleResponse> {
    const response: RoleResponse = {
      message: 'Role could not be saved',
      success: false,
      role: undefined,
    };

    try {
      const role = await this.connection.transaction(async manager => {
        const role = new Role();
        role.name = roleDTO.name.toUpperCase();
        role.privilege = privileges;
        await manager.save(role);
        return role;
      });
      if (!role) throw Error(response.message);
      response.message = 'Role created';
      response.success = true;
      response.role = role;
      return response;
    } catch (e) {
      console.log(e);
      throw Error(response.message);
    }
  }

  async update(role: Role, roleDTO: RoleUpdateDTO, privilege: Privilege[]) {
    const response: RoleResponse = {
      message: 'Role could not be saved',
      success: false,
      role: undefined,
    };
    role.name = roleDTO.name;
    try {
      role.privilege = privilege;
      role.name = roleDTO.name;
      const updatedRole = await this.connection.manager.save(role);
      if (!updatedRole) throw Error(response.message);

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
