import {
  BuildingEntrance,
  BuildingEntranceAction,
} from '../../entities/building.entity';

export interface BuildingEntranceActionResopnse extends BasicResponse {
  action: BuildingEntranceAction | BuildingEntranceAction[];
}

export interface BuildingEntranceResponse extends BasicResponse {
  entrance: BuildingEntrance;
}
