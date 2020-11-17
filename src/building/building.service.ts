import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import {
  BuildingEntrance,
  BuildingEntranceAction,
} from '../entities/building.entity';
import { User } from '../entities/user.entity';
import {
  BuildingEntranceActionResopnse,
  BuildingEntranceResponse,
} from './interface/response.interface';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(BuildingEntrance)
    private readonly buildingEntranceRepository: Repository<BuildingEntrance>,
    @InjectRepository(BuildingEntranceAction)
    private readonly buildingEntranceActionRepository: Repository<
      BuildingEntranceAction
    >,
    private readonly connection: Connection,
  ) {}

  async findBuildingEntranceAction(
    id: number,
  ): Promise<BuildingEntranceActionResopnse> {
    const response: BuildingEntranceActionResopnse = {
      message: 'Not found',
      success: false,
      action: undefined,
    };

    if (id) {
      const action = await this.buildingEntranceActionRepository.findOne(id);
      if (!action) return response;
      response.message = 'Found';
      response.success = true;
      response.action = action;
      return response;
    }

    const actions = await this.buildingEntranceActionRepository.find({});
    response.message = 'Found';
    response.success = true;
    response.action = actions;

    return response;
  }
  async createBuildingEntrance(action: BuildingEntranceAction, user: User) {
    const response: BuildingEntranceResponse = {
      message: 'Could not be created',
      success: false,
      entrance: undefined,
    };

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const entrance = new BuildingEntrance();
      entrance.action = action;
      entrance.user = user;

      const savedEntrance = await this.buildingEntranceRepository.save(
        entrance,
      );
      if (!savedEntrance) throw new Error();

      response.success = true;
      response.message = 'Workstation updated';
      response.entrance = savedEntrance;
      await queryRunner.commitTransaction();
      return response;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return response;
    } finally {
      await queryRunner.release();
    }
  }
}
