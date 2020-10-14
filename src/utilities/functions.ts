import * as crypto from 'crypto';
import * as generator from 'generate-password';

export const hash = (text: string): string => {
  return crypto.createHmac('sha256', text).digest('hex');
};

export const generateTempPassword = () => {
  return generator.generate({ length: 10, lowercase: true, numbers: true });
};
