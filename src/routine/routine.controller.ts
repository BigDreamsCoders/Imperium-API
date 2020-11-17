import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Routine } from '../entities/routine.entity';
import { User } from '../entities/user.entity';
import { WorkstationCategory } from '../entities/workstation.catalog.entity';
import { Workstation } from '../entities/workstation.entity';
import { JwtGuard } from '../guards/jwt.guard';
import { UserService } from '../user/user.service';
import { WorkstationService } from '../workstation/workstation.service';
import { RoutineDTO, RoutineHistoryDTO } from './routine.dto';
import { RoutineService } from './routine.service';

@Controller('routine')
export class RoutineController {
  constructor(
    private readonly routineService: RoutineService,
    private readonly workstationService: WorkstationService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtGuard)
  @HttpCode(201)
  @Post()
  async create(@Req() req: any, @Body() routineDTO: RoutineDTO) {
    const workstationResponse = await this.workstationService.findAllOccureance(
      routineDTO.workstationCategories,
    );
    if (!workstationResponse.success)
      throw new BadRequestException(workstationResponse.message);
    const userResponse = await this.userService.findById(req.user.id);
    if (!userResponse.success)
      throw new BadRequestException(userResponse.message);
    const routineResponse = await this.routineService.createRoutine(
      userResponse.user,
      routineDTO,
      <WorkstationCategory[]>workstationResponse.workstationCategory,
    );
    if (!routineResponse.success) throw new InternalServerErrorException();
    return;
  }

  /* Este metodo quedara hechizo por razones de tiempo, sin validaciones pertinentes */
  @UseGuards(JwtGuard)
  @HttpCode(201)
  @Post('/history')
  async saveRoutineHistory(
    @Req() req: any,
    @Body() routineHistoryDTO: RoutineHistoryDTO,
  ) {
    const routineResponse = await this.routineService.find(
      routineHistoryDTO.routine,
      undefined,
    );
    if (!routineResponse.success)
      throw new BadRequestException(routineResponse.message);
    console.log('encuentra la rutina');
    const userResponse = await this.userService.findById(req.user.id);
    if (!userResponse.success)
      throw new BadRequestException(userResponse.message);

    const workstationResponse = await this.workstationService.findAllWorkstationOccureance(
      routineHistoryDTO.data.map(routineData => {
        return routineData.workstation;
      }),
    );

    if (!workstationResponse.success)
      throw new BadRequestException(workstationResponse.message);

    const historyResponse = await this.routineService.saveRoutineHistory(
      routineHistoryDTO,
      userResponse.user,
      routineResponse.routine,
      <Workstation[]>workstationResponse.workstation,
    );
    console.log('llega aqui');
    if (!historyResponse.success)
      throw new BadRequestException(historyResponse.message);

    return;
  }

  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Get('/user/save')
  async getSavedRoutines(@Req() req: any) {
    const routine = await this.routineService.findUserSavedRoutines(
      req.user.id,
    );
    if (!routine.success) throw new BadRequestException(routine.message);
    return {
      data: routine.routine,
    };
  }

  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Put('/user/save/:id')
  async saveToUserList(@Param('id') id: number, @Req() req: any) {
    const routineResponse = await this.routineService.find(id, undefined);
    if (!routineResponse.success)
      throw new BadRequestException(routineResponse.message);

    const user = await this.userService.find(req.user.id, undefined, undefined);
    if (!user) throw new BadRequestException('User not found');

    const savedResponse = await this.routineService.toggleRoutineToUserList(
      <User>user,
      <Routine>routineResponse.routine,
    );
    if (!savedResponse.success)
      throw new BadRequestException(savedResponse.message);
    return {
      msg: savedResponse.message,
    };
  }

  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Get('/:id*?')
  async find(@Param('id') id: number, @Req() req: any) {
    const user = await this.userService.find(req.user.id, undefined, undefined);

    if (!user) throw new BadRequestException('User not found');
    const response = await this.routineService.find(id, <User>user);
    if (!response.success) throw new BadRequestException(response.message);
    return {
      data: response.routine,
    };
  }
}

/* TODO: 
  tengo que ver como hacer para guardar los datos calorificos de cada workstation, supongo que voy a tener que guardar ese dato en otra entidad o algo parecido
*/
