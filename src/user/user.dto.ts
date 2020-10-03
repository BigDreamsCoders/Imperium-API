import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  ValidateNested,
  IsString,
  IsDateString,
} from 'class-validator';
import { FileDTO } from '../file/file.dto';
import { MembershipDTO } from '../membership/memebership.dto';
import { DocumentationString } from '../utilities/costants';

export class NewUserDTO {
  @ApiProperty({
    description: 'User email',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User raw password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

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
    description: DocumentationString.TYPE.ID("user's gender"),
  })
  @IsString()
  @IsNotEmpty()
  genderId: string;

  @ApiProperty({
    description: DocumentationString.TYPE.ID("user's role"),
  })
  @IsString()
  @IsNotEmpty()
  roleId: string;

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
