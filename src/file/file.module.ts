import { FileService } from './file.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '../entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  exports: [FileService, TypeOrmModule],
  controllers: [],
  providers: [FileService],
})
export class FileModule {}
