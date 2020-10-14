import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from '../entities/user.entity';
import { GenderResponse } from './interface/gender.interface';

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
  ) {}

  async findAll() {
    return await this.genderRepository.find();
  }

  async findByName(name: string): Promise<GenderResponse> {
    const response: GenderResponse = {
      message: 'Gender not found',
      success: false,
      gender: undefined,
    };

    const gender = await this.genderRepository.findOne({ where: { name } });

    if (!gender) return response;

    response.gender = gender;
    response.message = 'Gender found';
    response.success = true;

    return response;
  }

  async findById(id: number): Promise<GenderResponse> {
    const response: GenderResponse = {
      message: 'Gender not found',
      success: false,
      gender: undefined,
    };

    const gender = await this.genderRepository.findOne({ where: { id } });

    if (!gender) return response;

    response.gender = gender;
    response.message = 'Gender found';
    response.success = true;

    return response;
  }
}
