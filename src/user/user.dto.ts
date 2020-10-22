import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  ValidateNested,
  IsString,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { FileDTO } from '../file/file.dto';
import { MembershipDTO } from '../membership/memebership.dto';
import { DocumentationString } from '../utilities/costants';

export class UserDTO {
  @ApiProperty({
    description: 'User email',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User first name',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: "User's birthday",
  })
  @IsDateString()
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({
    description: 'Gender Id',
  })
  @IsNumber()
  @IsNotEmpty()
  genderId: number;

  @ApiProperty({
    description: DocumentationString.TYPE.ID("user's role"),
  })
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => MembershipDTO)
  membership: MembershipDTO;

  @ApiProperty()
  @ValidateNested()
  @Type(() => FileDTO)
  file: FileDTO;
}

export class UpdatePasswordDTO {
  @ApiProperty({
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'New user email',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export class UpdateUser {
  @ApiProperty({
    description: 'User email',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User first name',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: "User's birthday",
  })
  @IsDateString()
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({
    description: 'Gender Id',
  })
  @IsNumber()
  @IsNotEmpty()
  genderId: number;

  @ApiProperty({
    description: 'Role Id',
  })
  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}
