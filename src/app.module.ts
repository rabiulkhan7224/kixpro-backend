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
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import enviromentValidation from './config/enviroment.validation';

// Get the current NODE_ENV
const ENV = process.env.NODE_ENV;


@Module({
  imports: [
    UsersModule,
    CollectionsModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: enviromentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
       synchronize: configService.get('database.synchronize'),

          
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        host: configService.get('database.host'),
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        database: configService.get('database.name'),
        // username: 'postgres',
        // password: 'password',
        // host: 'localhost',
        // autoLoadEntities: true,
        // database: 'kispro',
      }),
    }),
    ProductsModule,
    ProductVariantsModule,
    CategoryModule,
    MediasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
