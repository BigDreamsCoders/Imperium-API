import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import {
  Routine,
  RoutineData,
  RoutineHistory,
} from '../entities/routine.entity';
import { User } from '../entities/user.entity';
import { WorkstationCategory } from '../entities/workstation.catalog.entity';
import { Workstation } from '../entities/workstation.entity';
import { RoutineResponse } from './interface/response.interface';
import { RoutineDTO, RoutineHistoryDTO } from './routine.dto';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
    @InjectRepository(RoutineHistory)
    private readonly routineHistoryRepository: Repository<RoutineHistory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async find(id: number, user: User) {
    const response = {
      message: 'Not found',
      success: false,
      routine: undefined,
    };
    try {
      response.message = 'Found';
      response.success = true;
      if (id) {
        const routine = await this.routineRepository.findOne(id, {
          relations: ['creator', 'workstation', 'workstation.workstationType'],
        });
        if (!routine) throw Error('Not found');

        response.routine = routine;
        return response;
      }
      const routines = await this.routineRepository.find({
        relations: ['creator', 'workstation', 'workstation.workstationType'],
      });
      if (user) {
        response.routine = routines.map(routine => {
          return {
            ...routine,
            saved: user.savedRoutines.some(i => i.id === routine.id),
          };
        });
        return response;
      }
      response.routine = routines;
      return response;
    } catch (e) {
      response.success = false;
      response.message = e.message;
      return response;
    }
  }

  async findUserSavedRoutines(id: number) {
    const response: RoutineResponse = {
      message: 'Not found',
      success: false,
      routine: undefined,
    };
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: [
          'savedRoutines',
          'savedRoutines.workstation',
          'savedRoutines.creator',
        ],
      });
      if (!user) throw Error();
      response.message = 'Found';
      response.success = true;
      response.routine = user.savedRoutines;
      return response;
    } catch (e) {
      console.log(e);
      return response;
    }
  }

  async toggleRoutineToUserList(user: User, routine: Routine) {
    const response: BasicResponse = {
      message: 'fail',
      success: false,
    };
    try {
      const exists = user.savedRoutines.some(i => i.id === routine.id);
      if (exists) {
        user.savedRoutines = user.savedRoutines.filter(
          ({ id }) => routine.id !== id,
        );
        response.message = 'removed';
      } else {
        user.savedRoutines = [...user.savedRoutines, routine];
        response.message = 'added';
      }
      const savedUser = await this.userRepository.save(user);
      if (!savedUser) throw Error();
      response.success = true;
      return response;
    } catch (e) {
      return response;
    }
  }

  async createRoutine(
    user: User,
    routineDTO: RoutineDTO,
    workstation: WorkstationCategory[],
  ) {
    const response: BasicResponse = {
      message: 'Not created',
      success: false,
    };
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const routine = new Routine();
      routine.creator = user;
      routine.workstation = workstation;
      routine.name = routineDTO.name;
      const savedRoutine = await this.routineRepository.save(routine);
      if (!savedRoutine) throw Error();
      response.message = 'Created';
      response.success = true;
      await queryRunner.commitTransaction();
      return response;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return response;
    } finally {
      await queryRunner.release();
    }
  }

  async saveRoutineHistory(
    routineHistoryDTO: RoutineHistoryDTO,
    user: User,
    routine: Routine,
    workstation: Workstation[],
  ) {
    const response: BasicResponse = {
      message: 'Error',
      success: false,
    };

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const routineData = routineHistoryDTO.data.map(data => {
        const newData = new RoutineData();
        newData.time = data.time;
        newData.workstation = workstation.find(
          element => element.id === data.workstation,
        );
        newData.calories = data.calories;
        newData.repetition = data.repetition;
        newData.sets = data.sets;
        return newData;
      });
      const history = new RoutineHistory();
      history.data = routineData;
      history.routine = routine;
      history.user = user;
      const savedRoutineHistory = await this.routineHistoryRepository.save(
        history,
      );
      if (!savedRoutineHistory) throw new Error();
      response.message = 'Saved';
      response.success = true;
      await queryRunner.commitTransaction();
      return response;
    } catch (e) {
      console.log(e);
      await queryRunner.rollbackTransaction();
      return response;
    } finally {
      await queryRunner.release();
    }
  }
}
