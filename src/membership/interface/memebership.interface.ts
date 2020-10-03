import {
  MembershipState,
  MembershipType,
} from '../../entities/membership.catalog.entity';
import { Membership } from '../../entities/membership.entity';

export interface MembershipResponse extends BasicResponse {
  membership: Membership;
}

export interface MembershipTypeResponse extends BasicResponse {
  membership: MembershipType;
}

export interface MembershipStateResponse extends BasicResponse {
  membership: MembershipState;
}

export interface NewMembership {
  type: MembershipType;
  state: MembershipState;
}
