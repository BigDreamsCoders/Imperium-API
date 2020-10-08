import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RolePrivilegeService } from '../rolePrivilege/role-privilege.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findByEmail(request.user.email);
    if (!user) return false;
    request.user = { ...request.user, roles: [user.role.name] };
    return true;
  }
}
