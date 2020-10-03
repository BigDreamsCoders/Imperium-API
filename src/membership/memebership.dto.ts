import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { DocumentationString } from './../utilities/costants';

export class MembershipDTO {
  @ApiProperty({
    description: DocumentationString.TYPE.ID('type'),
  })
  @IsNumberString()
  @IsNotEmpty()
  type: string;
  @ApiProperty({
    description: DocumentationString.TYPE.ID('state'),
  })
  @IsNumberString()
  @IsNotEmpty()
  state: string;
}

export class UpdateStateDTO {
  @ApiProperty({
    description: DocumentationString.TYPE.ID('state'),
  })
  @IsNumberString()
  @IsNotEmpty()
  state: string;
}

export class UpdateTypeDTO {
  @ApiProperty({
    description: DocumentationString.TYPE.ID('type'),
  })
  @IsNumberString()
  @IsNotEmpty()
  type: string;
}
