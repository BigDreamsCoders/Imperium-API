import { GenderService } from './gender.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],
  exports: [GenderService, TypeOrmModule],
  controllers: [],
  providers: [GenderService],
})
export class GenderModule {}
