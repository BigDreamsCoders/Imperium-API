import { Role } from '../../entities/role.entity';

export interface Response {
  success: boolean;
  message: string;
  role: Role;
}
