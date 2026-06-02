import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

const ENV = process.env.NODE_ENV;
dotenv.config({
  path: !ENV ? '.env' : `.env.${ENV}`,
});

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'your_fallback_database_url_here',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,

  entities: [
    path.join(process.cwd(), 'src', '**', '*.entity.ts'),
    path.join(process.cwd(), 'dist', '**', '*.entity.js'),
  ],
  migrations: [
    path.join(process.cwd(), 'src', 'migrations', '*.ts'),
    path.join(process.cwd(), 'dist', 'migrations', '*.js'),
  ],

  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});
