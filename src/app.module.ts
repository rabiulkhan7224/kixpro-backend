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
import dbConfig from './config/db.config';
import enviromentValidation from './config/enviroment.validation';
import { InventoryModule } from './inventory/inventory.module';
import { BrandModule } from './brand/brand.module';
import { CartModule } from './cart/cart.module';

// Get the current NODE_ENV
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UsersModule,
    CollectionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, dbConfig],
      validationSchema: enviromentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('new-database.url'),
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV !== 'production',

        logging: process.env.NODE_ENV === 'development',
      }),
    }),
    ProductsModule,
    ProductVariantsModule,
    CategoryModule,
    MediasModule,
    AuthModule,
    InventoryModule,
    BrandModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
