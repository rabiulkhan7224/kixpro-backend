import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ProductsModule } from './products/products.module';
import { CollectionsModule } from './collections/collections.module';
@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports:[],
      inject:[],
      useFactory:()=>({
      type: 'postgres',
      entities: [User],
      synchronize: true,
      port: 5432,
      username: 'postgres',
      password: 'password',
      host: 'localhost',
      database:"Kixpro-database"
      })
      
    }),
    ProductsModule,
    CollectionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
