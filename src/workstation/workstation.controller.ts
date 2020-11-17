import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { WorkstationService } from './workstation.service';
import { WorkstationUseDTO } from './workstation.dto';
import { UserService } from '../user/user.service';
import { Workstation } from '../entities/workstation.entity';

@Controller('workstation')
export class WorkstationController {
  constructor(
    private readonly workstationService: WorkstationService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Post('use/:id')
  async useWorkstation(
    @Param('id') id: number,
    @Body() workstationUseDTO: WorkstationUseDTO,
  ) {
    const userResponse = await this.userService.findById(
      workstationUseDTO.userId,
    );
    if (!userResponse.success)
      return new BadRequestException(userResponse.message);
    const workstationResponse = await this.workstationService.findById(id);
    if (!workstationResponse.workstation)
      return new BadRequestException(workstationResponse.message);
    const workstationActionResponse = await this.workstationService.findActionById(
      workstationUseDTO.actionId,
    );
    if (!workstationActionResponse.success)
      return new BadRequestException(workstationActionResponse.message);
    const workstationStateResponse = await this.workstationService.findStateById(
      workstationUseDTO.actionId === 1 ? 2 : 1,
    );
    if (!workstationStateResponse.success)
      return new BadRequestException(workstationStateResponse.message);
    try {
      const response = await this.workstationService.updateState(
        userResponse.user,
        <Workstation>workstationResponse.workstation,
        workstationActionResponse.workstationAction,
        workstationStateResponse.workstationState,
      );
      if (!response.success) {
        throw new BadRequestException(response.message);
      }
      return response.workstation;
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }
  }

  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Get('/category/:id*?')
  async findCategory(@Param('id') id: number) {
    const response = await this.workstationService.findCategories(id);
    if (!response.success) throw new BadRequestException(response.message);
    return {
      categories: response.workstationCategory,
    };
  }

  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Get('/by/category/:id')
  async findWorkstationsByCategory(@Param('id') id: number) {
    const response = await this.workstationService.findByCategory(id);
    if (!response.success) throw new BadRequestException(response.message);
    return {
      workstations: response.workstation,
    };
  }

  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Get('/available/:id')
  async findAvailableWorkstation(@Param('id') id: number) {
    const response = await this.workstationService.findAvailableByCategory(id);
    if (!response.success) throw new BadRequestException(response.message);
    return response.workstation;
  }

  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Get('/:id*?')
  async find(
    @Param('id') id: number,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return await this.workstationService.find(id, limit, page);
  }
}
