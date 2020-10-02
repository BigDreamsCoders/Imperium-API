import { Role } from '../../entities/role.entity';

export interface RoleResponse extends BasicResponse {
  role: Role;
}
