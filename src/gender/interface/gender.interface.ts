import { Gender } from '../../entities/user.entity';

export interface GenderResponse {
  success: boolean;
  message: string;
  gender: Gender;
}
