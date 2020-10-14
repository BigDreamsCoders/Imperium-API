import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DocumentationString } from '../utilities/costants';

export class RoleDTO {
  @ApiProperty({
    description: 'Role name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class RoleUpdateDTO {
  @ApiProperty({
    description: 'Role Id',
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'New role name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class RoleDeleteDTO {
  @ApiProperty({
    description: 'Role Id',
  })
  @IsNotEmpty()
  @IsString()
  id: number;
}
