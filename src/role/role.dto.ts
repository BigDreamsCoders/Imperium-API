import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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
    description: DocumentationString.TYPE.ID('Role'),
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'New role name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class RoleDeleteDTO {
  @ApiProperty({
    description: DocumentationString.TYPE.ID('role'),
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}
