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
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ShippingModule } from './shipping/shipping.module';
import { ReviewsModule } from './reviews/reviews.module';
import { NotificationsModule } from './notifications/notifications.module';
import { EmailModule } from './email/email.module';
import { BullModule } from '@nestjs/bullmq';

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

    // ==================== BULLMQ ====================
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),

          // Recommended settings for production
          maxRetriesPerRequest: null, // Important for BullMQ
          enableReadyCheck: false,
        },
        defaultJobOptions: {
          removeOnComplete: 100, // Keep last 100 completed jobs
          removeOnFail: 50, // Keep last 50 failed jobs
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
        },
      }),
    }),

    // Register queues that are used globally or by multiple modules
    BullModule.registerQueue(
      { name: 'email' }, // used by NotificationsModule
      // { name: 'orders' },       // later if needed
    ),

    ProductsModule,
    ProductVariantsModule,
    CategoryModule,
    MediasModule,
    AuthModule,
    InventoryModule,
    BrandModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
    ShippingModule,
    ReviewsModule,
    NotificationsModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
