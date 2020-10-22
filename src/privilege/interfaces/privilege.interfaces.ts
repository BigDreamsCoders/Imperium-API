import { Privilege } from '../../entities/role.entity';

export interface PaginatedPrivilege {
  count: number;
  data: Privilege[];
}
