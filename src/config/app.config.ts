import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  resend_apikey: process.env.RESEND_API_KEY || '',
  resend_from_email: process.env.RESEND_FROM_EMAIL || '',
  app_name: process.env.APP_NAME || 'kixpro',
}));
