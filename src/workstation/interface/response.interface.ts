import {
  WorkstationAction,
  WorkstationState,
} from '../../entities/workstation.catalog.entity';
import { Workstation } from '../../entities/workstation.entity';

export interface WorkstationResponse extends BasicResponse {
  workstation: Workstation;
}

export interface WorkstationActionResponse extends BasicResponse {
  workstationAction: WorkstationAction;
}

export interface WorkstationStateResponse extends BasicResponse {
  workstationState: WorkstationState;
}

export interface PaginatedWorkstation {
  count: number;
  data: Workstation[];
}
