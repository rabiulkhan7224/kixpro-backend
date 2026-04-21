import { registerAs } from '@nestjs/config';

export default registerAs('new-database', () => ({
  environment: process.env.NODE_ENV || 'production',
  url: process.env.DATABASE_URL,
}));
