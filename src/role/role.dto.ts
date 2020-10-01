import { IsNotEmpty, IsString } from 'class-validator';

export class RoleDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class RoleUpdateDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class RoleDeleteDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
}
