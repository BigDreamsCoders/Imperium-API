import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  MembershipState,
  MembershipType,
} from '../entities/membership.catalog.entity';
import { Membership } from '../entities/membership.entity';
import {
  MembershipResponse,
  MembershipTypeResponse,
  MembershipStateResponse,
  NewMembership,
} from './interface/memebership.interface';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
    @InjectRepository(MembershipType)
    private readonly membershipTypeRepository: Repository<MembershipType>,
    @InjectRepository(MembershipState)
    private readonly membershipStateRepository: Repository<MembershipState>,
  ) {}

  async find(id: string): Promise<Membership[] | MembershipResponse> {
    if (id) {
      return await this.findById(id);
    }
    return await this.membershipRepository.find();
  }

  async findById(id: string): Promise<MembershipResponse> {
    const response: MembershipResponse = {
      success: false,
      message: 'Membership not found',
      membership: undefined,
    };
    const membership = await this.membershipRepository.findOne({
      where: { id },
      relations: ['membershipState', 'membershipType'],
    });
    if (!membership) return response;

    response.message = 'Membership found';
    response.success = true;
    response.membership = membership;

    return response;
  }

  async create(memberDTO: NewMembership): Promise<MembershipResponse> {
    const response: MembershipResponse = {
      message: 'Membership could not be created',
      success: false,
      membership: undefined,
    };

    const membership = new Membership();
    membership.membershipState = memberDTO.state;
    membership.membershipType = memberDTO.type;

    const membershipCreated = await this.membershipRepository.save(membership);

    if (!membershipCreated) return response;

    response.membership = membershipCreated;
    response.success = true;
    response.message = 'Membership created';

    return response;
  }

  async remove(membership: Membership): Promise<MembershipResponse> {
    const response: MembershipResponse = {
      success: false,
      message: 'Membership not deleted',
      membership: undefined,
    };

    const membershipDeleted = await this.membershipRepository.remove(
      membership,
    );

    if (!membershipDeleted) return response;

    response.success = true;
    response.message = 'Membership deleted';
    response.membership = membershipDeleted;

    return response;
  }

  async updateState(
    membership: Membership,
    memberState: MembershipState,
  ): Promise<MembershipResponse> {
    const response: MembershipResponse = {
      success: false,
      message: 'Membership not updated',
      membership: undefined,
    };

    membership.membershipState = memberState;

    const membershipSaved = await this.membershipRepository.save(membership);

    if (!membershipSaved) return response;

    response.membership = membershipSaved;
    response.success = true;
    response.message = 'Memebership updated';

    return response;
  }

  async updateType(
    membership: Membership,
    memberType: MembershipType,
  ): Promise<MembershipResponse> {
    const response: MembershipResponse = {
      success: false,
      message: 'Membership not updated',
      membership: undefined,
    };

    membership.membershipType = memberType;
    const membershipSaved = await this.membershipRepository.save(membership);
    if (!membershipSaved) return response;

    response.membership = membershipSaved;
    response.success = true;
    response.message = 'Memebership updated';

    return response;
  }

  async findAllType(): Promise<MembershipType[]> {
    return await this.membershipTypeRepository.find();
  }

  async findTypeByID(id: string): Promise<MembershipTypeResponse> {
    const response: MembershipTypeResponse = {
      message: 'Membership type could not be found',
      success: false,
      membership: undefined,
    };

    const membership = await this.membershipTypeRepository.findOne({
      where: { id },
    });

    if (!membership) return response;

    response.membership = membership;
    response.success = true;
    response.message = 'Membership found';

    return response;
  }

  async findAllState(): Promise<MembershipState[]> {
    return await this.membershipStateRepository.find();
  }

  async findStateByID(id: string): Promise<MembershipStateResponse> {
    const response: MembershipStateResponse = {
      message: 'Membership type could not be found',
      success: false,
      membership: undefined,
    };

    const membership = await this.membershipStateRepository.findOne({
      where: { id },
    });

    if (!membership) return response;

    response.membership = membership;
    response.success = true;
    response.message = 'Membership found';

    return response;
  }
}
