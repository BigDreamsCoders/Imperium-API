import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class WorkstationUseDTO {
  @ApiProperty({
    description: 'Workstation action id',
  })
  @IsNumber()
  @IsNotEmpty()
  actionId: number;

  @ApiProperty({
    description: 'User id',
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
