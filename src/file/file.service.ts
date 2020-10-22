import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../entities/file.entity';
import { FileDTO } from './file.dto';
import { FileResponse } from './interface/response.interface';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async findById(id: number) {
    const response: FileResponse = {
      success: false,
      message: 'File not found',
      file: undefined,
    };

    const file = await this.fileRepository.findOne({ where: { id } });
    if (!file) return response;

    response.file = file;
    response.success = true;
    response.message = 'File found';

    return response;
  }

  async create(fileDTO: FileDTO): Promise<FileResponse> {
    const response: FileResponse = {
      success: false,
      message: 'File not created',
      file: undefined,
    };

    const file = new File();
    file.weight = fileDTO.weight;
    file.height = fileDTO.height;
    const fileSaved = await this.fileRepository.save(file);

    if (!fileSaved) return response;

    response.file = fileSaved;
    response.success = true;
    response.message = 'File created';

    return response;
  }

  async updateFile(file: File, fileDTO: FileDTO): Promise<FileResponse> {
    const response: FileResponse = {
      success: false,
      message: 'File not updated',
      file: undefined,
    };
    file.height = fileDTO.height;
    file.weight = fileDTO.weight;
    const fileUpdated = await this.fileRepository.save(file);

    if (!fileUpdated) return response;

    response.file = fileUpdated;
    response.success = true;
    response.message = 'File created';

    return response;
  }
}
