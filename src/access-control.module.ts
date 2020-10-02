import { Module } from '@nestjs/common';
import { AccessControlModule, RolesBuilder } from 'nest-access-control';
import { RolePrivilegeModule } from './rolePrivilege/role-privilege.module';
import { RolePrivilegeService } from './rolePrivilege/role-privilege.service';

@Module({
  imports: [
    AccessControlModule.forRootAsync({
      imports: [RolePrivilegeModule],
      inject: [RolePrivilegeService],
      useFactory: async (rolePrivilegeService: RolePrivilegeService) => {
        const role_privilege_raw = await rolePrivilegeService.findAll();
        const role_privilege = role_privilege_raw.map(
          ({ role, privilege }) => ({
            role: role.name,
            resource: privilege.resource,
            action: privilege.action,
          }),
        );
        return new RolesBuilder(role_privilege);
      },
    }),
  ],
})
export class AccControlModule {}
