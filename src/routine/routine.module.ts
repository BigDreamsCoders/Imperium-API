import { RoutineController } from './routine.controller';
import { RoutineService } from './routine.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Routine,
  RoutineData,
  RoutineDataType,
} from '../entities/routine.entity';
import { User } from '../entities/user.entity';
import { UserModule } from '../user/user.module';
import { WorkstationModule } from '../workstation/workstation.module';
import { WorkstationService } from '../workstation/workstation.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    UserModule,
    WorkstationModule,
    TypeOrmModule.forFeature([Routine, User, RoutineData, RoutineDataType]),
  ],
  exports: [TypeOrmModule],
  controllers: [RoutineController],
  providers: [RoutineService, WorkstationService, UserService],
})
export class RoutineModule {}
