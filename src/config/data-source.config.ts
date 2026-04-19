import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

// Load .env.development or .env based on NODE_ENV
config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });

const isProduction = process.env.NODE_ENV === 'production';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',

  // Use DATABASE_URL in production (e.g. NeonDB / Vercel Postgres),
  // or fall back to individual host/port/user/password/name for local dev.
  ...(isProduction
    ? {
        url: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: process.env.DATABASE_HOST ?? 'localhost',
        port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        ssl: false,
      }),

  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  migrationsTableName: 'typeorm_migrations',

  // Never use synchronize in production — run migrations instead.
  synchronize: false,

  // Only log slow/failing queries in development.
  logging: !isProduction ? ['error', 'warn', 'migration'] : false,
};

// Standalone DataSource used by the TypeORM CLI (migration commands).
export default new DataSource(dataSourceOptions);
