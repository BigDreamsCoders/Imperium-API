import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import {
  MembershipDTO,
  UpdateStateDTO,
  UpdateTypeDTO,
} from './memebership.dto';
import { MembershipResponse } from './interface/memebership.interface';
import { Membership } from '../entities/membership.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Membership')
@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @HttpCode(200)
  @Get('/:id*?')
  async find(@Param('id') id: string): Promise<Membership | Membership[]> {
    const membership = await this.membershipService.find(id);
    if ('success' in membership) {
      if (!membership.success) {
        throw new BadRequestException(membership.message);
      }
      return membership.membership;
    }
    return membership;
  }

  @HttpCode(201)
  @Post('')
  async create(
    @Body() membershipDTO: MembershipDTO,
  ): Promise<MembershipResponse> {
    const typeResponse = await this.membershipService.findTypeByID(
      membershipDTO.type,
    );
    if (!typeResponse.success)
      throw new BadRequestException(typeResponse.message);
    const stateResponse = await this.membershipService.findTypeByID(
      membershipDTO.state,
    );
    if (!stateResponse.success)
      throw new BadRequestException(stateResponse.message);
    const newMembershipResponse = await this.membershipService.create({
      membershipState: stateResponse.membership,
      membershipType: typeResponse.membership,
    });
    if (!newMembershipResponse.success)
      throw new InternalServerErrorException();
    delete newMembershipResponse.success;
    return newMembershipResponse;
  }

  @HttpCode(200)
  @Delete('/:id')
  async remove(@Param('id') id: string): Promise<MembershipResponse> {
    const membershipResponse = (await this.membershipService.find(
      id,
    )) as MembershipResponse;

    if (!membershipResponse.success)
      throw new BadRequestException(membershipResponse.message);

    const membershipDeleted = await this.membershipService.remove(
      membershipResponse.membership,
    );

    if (!membershipDeleted.success) throw new InternalServerErrorException();

    delete membershipDeleted.success;
    return membershipDeleted;
  }

  @HttpCode(200)
  @Put('/state/:id')
  async updateState(@Param('id') id: string, @Body() stateDTO: UpdateStateDTO) {
    const stateResponse = await this.membershipService.findStateByID(
      stateDTO.state,
    );
    if (!stateResponse.success)
      throw new BadRequestException(stateResponse.message);
    const membershipResponse = await this.membershipService.findById(id);
    if (!membershipResponse.success)
      throw new BadRequestException(membershipResponse.message);
    const membershipUpdated = await this.membershipService.updateState(
      membershipResponse.membership,
      stateResponse.membership,
    );
    if (!membershipUpdated.success) throw new InternalServerErrorException();

    delete membershipUpdated.success;
    return membershipUpdated;
  }

  @HttpCode(200)
  @Put('/type/:id')
  async updateType(@Param('id') id: string, @Body() typeDTO: UpdateTypeDTO) {
    const typeResponse = await this.membershipService.findTypeByID(
      typeDTO.type,
    );
    if (!typeResponse.success)
      throw new BadRequestException(typeResponse.message);
    const membershipResponse = await this.membershipService.findById(id);
    if (!membershipResponse.success)
      throw new BadRequestException(membershipResponse.message);
    const membershipUpdated = await this.membershipService.updateType(
      membershipResponse.membership,
      typeResponse.membership,
    );
    if (!membershipUpdated.success) throw new InternalServerErrorException();

    delete membershipUpdated.success;
    return membershipUpdated;
  }
}
