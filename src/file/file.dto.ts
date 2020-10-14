import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FileDTO {
  @ApiProperty({
    description: 'Weigth of the user',
  })
  @IsNumber()
  @IsNotEmpty()
  weight: number;
  @ApiProperty({
    description: 'Height of the user',
  })
  @IsNumber()
  @IsNotEmpty()
  height: number;
}
