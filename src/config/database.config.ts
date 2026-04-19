import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    // Shared
    synchronize: false,
    autoLoadEntities: true,

    // Production: single connection URL (NeonDB / Vercel Postgres / Supabase)
    ...(isProduction
      ? {
          url: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false },
        }
      : // Development: individual connection fields
        {
          host: process.env.DATABASE_HOST ?? 'localhost',
          port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
        }),
  };
});
