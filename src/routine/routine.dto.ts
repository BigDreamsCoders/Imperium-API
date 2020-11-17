import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RoutineDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  workstationCategories: number[];
}

export class RoutineDataDTO {
  @IsNotEmpty()
  @IsNumber()
  workstation: number;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsOptional()
  @IsString()
  calories: string;

  @IsOptional()
  @IsNumber()
  repetition: number;

  @IsOptional()
  @IsNumber()
  sets: number;
}

export class RoutineHistoryDTO {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RoutineDataDTO)
  data: RoutineDataDTO[];

  @IsNotEmpty()
  @IsNumber()
  routine: number;
}
