import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [],
      synchronize: true,
      port: 5432,
      username: 'postgres',
      password: 'password',
      host: 'localhost',
      database:"Kixpro-database"
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
