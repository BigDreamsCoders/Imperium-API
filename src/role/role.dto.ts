import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoleDTO {
  @ApiProperty({
    description: 'Role name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  privileges: number[];
}

export class RoleUpdateDTO {
  @ApiProperty({
    description: 'New role name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  privileges: number[];
}

export class RoleDeleteDTO {
  @ApiProperty({
    description: 'Role Id',
  })
  @IsNotEmpty()
  @IsString()
  id: number;
}
