import { registerAs } from '@nestjs/config';

export default registerAs('new-database', () => ({
  environment: process.env.NODE_ENV || 'production',
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}));
