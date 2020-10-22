import { Module } from '@nestjs/common';
import { AccessControlModule, RolesBuilder } from 'nest-access-control';
import { Role } from './entities/role.entity';
import { RoleModule } from './role/role.module';
import { RoleService } from './role/role.service';

@Module({
  imports: [
    AccessControlModule.forRootAsync({
      imports: [RoleModule],
      inject: [RoleService],
      useFactory: async (roleService: RoleService) => {
        const role_privilege_raw = await roleService.find(undefined);
        const role_privilege = (role_privilege_raw as Role[]).reduce(
          (prev, { name, privilege: privileges }) => {
            const privilegesXrole = privileges.map(privilege => ({
              role: name,
              resource: privilege.resource,
              action: privilege.action,
              possession: privilege.possession,
            }));
            return [...prev, ...privilegesXrole];
          },
          [],
        );
        return new RolesBuilder(role_privilege);
      },
    }),
  ],
})
export class AccControlModule {}
