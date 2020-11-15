import { WorkstationController } from './workstation.controller';
import { WorkstationService } from './workstation.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workstation } from '../entities/workstation.entity';
import {
  WorkstationAction,
  WorkstationCategory,
  WorkstationState,
  WorkstationUse,
} from '../entities/workstation.catalog.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      Workstation,
      WorkstationUse,
      WorkstationAction,
      WorkstationState,
      WorkstationCategory,
    ]),
  ],
  exports: [TypeOrmModule],
  controllers: [WorkstationController],
  providers: [WorkstationService],
})
export class WorkstationModule {}
