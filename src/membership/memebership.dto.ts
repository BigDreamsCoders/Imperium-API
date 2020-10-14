import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MembershipDTO {
  @ApiProperty({
    description: 'Type Id',
  })
  @IsNumber()
  @IsNotEmpty()
  type: number;
  @ApiProperty({
    description: 'State Id',
  })
  @IsNumber()
  @IsNotEmpty()
  state: number;
}

export class UpdateStateDTO {
  @ApiProperty({
    description: 'State Id',
  })
  @IsNumber()
  @IsNotEmpty()
  state: number;
}

export class UpdateTypeDTO {
  @ApiProperty({
    description: 'Type Id',
  })
  @IsNumber()
  @IsNotEmpty()
  type: number;
}
