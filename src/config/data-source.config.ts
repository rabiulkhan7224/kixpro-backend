import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables based on NODE_ENV
config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }, // Required for NeonDB
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  migrationsTableName: 'typeorm_migrations',
  logging: process.env.NODE_ENV === 'development',
  synchronize: false,
};

export default new DataSource(dataSourceOptions);