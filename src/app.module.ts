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
@Module({
  imports: [
    UsersModule,
    CollectionsModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        synchronize: true,
        port: 5432,
        username: 'postgres',
        password: 'password',
        host: 'localhost',
        autoLoadEntities: true,
        database: 'Kixpro-database',
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
