import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CollectionsModule } from './collections/collections.module';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { CategoryModule } from './category/category.module';
import { MediasModule } from './medias/medias.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import enviromentValidation from './config/enviroment.validation';
import { dataSourceOptions } from './config/data-source.config';

// Get the current NODE_ENV
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UsersModule,
    CollectionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: enviromentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('database.url'),
        // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
        autoLoadEntities: true,
        synchronize: false, // Set to false in production
      }),
    }),
    ProductsModule,
    ProductVariantsModule,
    CategoryModule,
    MediasModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
