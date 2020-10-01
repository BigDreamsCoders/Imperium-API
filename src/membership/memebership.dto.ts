import { IsNotEmpty, IsString } from 'class-validator';

export class MembershipDTO {
  @IsString()
  @IsNotEmpty()
  type: string;
  @IsString()
  @IsNotEmpty()
  state: string;
}

export class UpdateStateDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  state: string;
}

export class UpdateTypeDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  type: string;
}
