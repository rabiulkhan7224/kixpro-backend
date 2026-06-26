import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

const ENV = process.env.NODE_ENV;
dotenv.config({
  path: !ENV ? '.env' : `.env.${ENV}`,
});

const isCompiled = path.extname(__filename) === '.js';
const sourcePath = process.cwd();
const compiledPath = path.join(process.cwd(), 'dist');

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'your_fallback_database_url_here',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,

  entities: [
    isCompiled ? path.join(compiledPath, '**', '*.entity.js') : path.join(sourcePath, 'src', '**', '*.entity.ts'),
  ],
  migrations: [
    isCompiled ? path.join(compiledPath, 'migrations', '*.js') : path.join(sourcePath, 'src', 'migrations', '*.ts'),
  ],

  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});
