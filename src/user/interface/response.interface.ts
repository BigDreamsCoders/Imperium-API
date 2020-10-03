import {
  MembershipState,
  MembershipType,
} from '../../entities/membership.catalog.entity';
import { Role } from '../../entities/role.entity';
import { Gender, User } from '../../entities/user.entity';
import { FileDTO } from '../../file/file.dto';

export interface UserResponse extends BasicResponse {
  user: User;
}

export interface UserProcessed {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: Gender;
  role: Role;
  membershipType: MembershipType;
  membershipState: MembershipState;
  file: FileDTO;
}
