import { File } from '../../entities/file.entity';

export interface FileResponse extends BasicResponse {
  file: File;
}
