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
import { Workstation } from '../entities/workstation.entity';
import { JwtGuard } from '../guards/jwt.guard';
import { UserService } from '../user/user.service';
import { WorkstationService } from '../workstation/workstation.service';
import { RoutineDTO } from './routine.dto';
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
      routineDTO.workstation,
    );
    if (!workstationResponse.success)
      throw new BadRequestException(workstationResponse.message);
    const userResponse = await this.userService.findById(req.user.id);
    if (!userResponse.success)
      throw new BadRequestException(userResponse.message);
    const routineResponse = await this.routineService.createRoutine(
      userResponse.user,
      routineDTO,
      <Workstation[]>workstationResponse.workstation,
    );
    if (!routineResponse.success) throw new InternalServerErrorException();
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
