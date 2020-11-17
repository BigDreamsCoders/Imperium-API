import { BuildingService } from './building.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BuildingEntrance,
  BuildingEntranceAction,
} from '../entities/building.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BuildingEntrance, BuildingEntranceAction]),
  ],
  exports: [TypeOrmModule],
  controllers: [],
  providers: [BuildingService],
})
export class BuildingModule {}
