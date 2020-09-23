import * as crypto from 'crypto';

export const hash = (text: string): string => {
  return crypto.createHmac('sha256', text).digest('hex');
};
