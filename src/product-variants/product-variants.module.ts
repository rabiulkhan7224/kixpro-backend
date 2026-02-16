import { Module } from '@nestjs/common';
import { ProductVariantsController } from './product-variants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariant } from './entites/productVariant.entity';

@Module({
  controllers: [ProductVariantsController],
  imports: [TypeOrmModule.forFeature([ProductVariant])],
})
export class ProductVariantsModule {}
