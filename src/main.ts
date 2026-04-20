import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  // Enable global CORS
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  /**
   * swagger configuration
   */
  const config = new DocumentBuilder()
    .setTitle('NestJs backend  - kixpro E-Commerce Backend app API')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    // https://kixpro-backend.vercel.app
    .addServer('http://localhost:3000')
    .addServer('https://kixpro-backend.vercel.app')
    .setVersion('1.0')
    .build();

  // Instantiate Document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
