import { Routine } from '../../entities/routine.entity';

export interface RoutineResponse extends BasicResponse {
  routine: Routine | Routine[];
}
