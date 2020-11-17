import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, In, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import {
  WorkstationAction,
  WorkstationCategory,
  WorkstationState,
  WorkstationUse,
} from '../entities/workstation.catalog.entity';
import { Workstation } from '../entities/workstation.entity';
import {
  PaginatedWorkstation,
  WorkstationActionResponse,
  WorkstationCategoryResponse,
  WorkstationResponse,
  WorkstationStateResponse,
} from './interface/response.interface';

@Injectable()
export class WorkstationService {
  constructor(
    @InjectRepository(Workstation)
    private readonly workstationRepository: Repository<Workstation>,
    @InjectRepository(WorkstationUse)
    private readonly workstationUseRepository: Repository<WorkstationUse>,
    @InjectRepository(WorkstationAction)
    private readonly workstationActionRepository: Repository<WorkstationAction>,
    @InjectRepository(WorkstationState)
    private readonly workstationStateRepository: Repository<WorkstationState>,
    @InjectRepository(WorkstationCategory)
    private readonly workstationCategoryRepository: Repository<
      WorkstationCategory
    >,
    private readonly connection: Connection,
  ) {}

  async findActionById(id: number): Promise<WorkstationActionResponse> {
    const response: WorkstationActionResponse = {
      message: 'Workstation action not found',
      success: false,
      workstationAction: undefined,
    };

    const workstationAction = await this.workstationActionRepository.findOne(
      id,
    );
    if (!workstationAction) return response;

    response.success = true;
    response.message = 'Workstation action found';
    response.workstationAction = workstationAction;
    return response;
  }

  async findStateById(id: number): Promise<WorkstationStateResponse> {
    const response: WorkstationStateResponse = {
      message: 'State not found',
      success: false,
      workstationState: undefined,
    };
    const state = await this.workstationStateRepository.findOne(id);
    if (!state) return response;

    response.message = 'State found';
    response.success = true;
    response.workstationState = state;
    return response;
  }

  async findById(id: number): Promise<WorkstationResponse> {
    const response: WorkstationResponse = {
      message: 'Workstation not found',
      success: false,
      workstation: undefined,
    };

    const workstation = await this.workstationRepository.findOne(id, {
      relations: ['workstationState'],
    });
    if (!workstation) return response;

    response.success = true;
    response.message = 'Workstation found';
    response.workstation = workstation;
    return response;
  }

  async find(
    id: number,
    limit: number,
    page: number,
  ): Promise<Workstation[] | Workstation | PaginatedWorkstation> {
    if (id) {
      return this.workstationRepository.findOne(id, {
        relations: ['workstationType', 'workstationState'],
      });
    }
    if (limit === undefined || page === undefined)
      return this.workstationRepository.find({
        relations: ['workstationType', 'workstationState'],
      });
    const [workstations, count] = await this.workstationRepository.findAndCount(
      {
        take: limit,
        skip: page * limit,
        relations: [
          'workstationType',
          'workstationState',
          'workstationCategory',
        ],
        order: { id: 'ASC' },
      },
    );
    return {
      count,
      data: workstations,
    };
  }

  async findAllOccureance(id: number[]) {
    const response: WorkstationCategoryResponse = {
      message: 'Workstation not found',
      success: false,
      workstationCategory: undefined,
    };
    try {
      const workstationCategories = await this.workstationCategoryRepository.findByIds(
        id,
      );
      if (!workstationCategories || workstationCategories.length !== id.length)
        throw Error();
      response.message = 'Found';
      response.success = true;
      response.workstationCategory = workstationCategories;
      return response;
    } catch (e) {
      console.log(e);
      return response;
    }
  }

  async findAllWorkstationOccureance(id: number[]) {
    const response: WorkstationResponse = {
      message: 'Workstation not found',
      success: false,
      workstation: undefined,
    };
    try {
      const workstation = await this.workstationRepository.findByIds(id);
      if (!workstation || workstation.length !== id.length) throw Error();
      response.message = 'Found';
      response.success = true;
      response.workstation = workstation;
      return response;
    } catch (e) {
      console.log(e);
      return response;
    }
  }

  async findCategories(id: number): Promise<WorkstationCategoryResponse> {
    const response: WorkstationCategoryResponse = {
      message: 'Not found',
      success: false,
      workstationCategory: undefined,
    };
    try {
      response.message = 'Found';
      response.success = true;
      if (id) {
        const workstation = await this.workstationCategoryRepository.findOne(
          id,
        );
        response.workstationCategory = workstation;
        return response;
      }
      const workstations = await this.workstationCategoryRepository.find({
        order: { id: 'ASC' },
      });
      response.workstationCategory = workstations;
      return response;
    } catch (e) {
      response.message = 'Not found';
      response.success = false;
      return response;
    }
  }

  async findByCategory(id: number) {
    const response: WorkstationResponse = {
      message: 'Not found',
      success: false,
      workstation: undefined,
    };
    try {
      const workstation = await this.workstationRepository.find({
        where: { workstationCategory: id },
        order: { id: 'ASC' },
      });
      if (!workstation) throw Error();
      response.message = 'Found';
      response.success = true;
      response.workstation = workstation;
      return response;
    } catch (e) {
      return response;
    }
  }

  async updateState(
    user: User,
    workstation: Workstation,
    action: WorkstationAction,
    state: WorkstationState,
  ) {
    const response: WorkstationResponse = {
      message: 'Workstation not updated',
      success: false,
      workstation: undefined,
    };
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const use = new WorkstationUse();
      use.action = action;
      use.user = user;
      use.workstation = workstation;

      if (action.id === 1 && workstation.workstationState.id === 2) {
        response.message = 'La maquina esta siendo utilizada';
        throw new Error();
      }

      const savedUseWorkstation = await this.workstationUseRepository.save(use);
      if (!savedUseWorkstation) throw new Error(response.message);

      workstation.workstationState = state;
      const workstationUpdated = await this.workstationRepository.save(
        workstation,
      );
      if (!workstationUpdated) throw new Error(response.message);

      response.success = true;
      response.message = 'Workstation updated';
      response.workstation = workstationUpdated;
      await queryRunner.commitTransaction();
      return response;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return response;
    } finally {
      await queryRunner.release();
    }
  }

  async findAvailableByCategory(id: number) {
    const response: WorkstationResponse = {
      message: 'Not found',
      success: false,
      workstation: undefined,
    };

    try {
      const workstation = await this.workstationRepository.find({
        where: { workstationCategory: id, workstationState: 1 },
        order: { id: 'ASC' },
      });
      if (!workstation) throw Error();
      response.message = 'Found';
      response.success = true;
      response.workstation = workstation;
      return response;
    } catch (e) {
      return response;
    }
  }
}
