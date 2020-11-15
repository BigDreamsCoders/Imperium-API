import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoutineDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  workstation: number[];
}
