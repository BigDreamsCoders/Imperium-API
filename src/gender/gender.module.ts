import { GenderService } from './gender.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from '../entities/user.entity';

@Module({
  exports: [GenderService],
  imports: [TypeOrmModule.forFeature([Gender])],
  controllers: [],
  providers: [GenderService],
})
export class GenderModule {}
