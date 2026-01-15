import { Module } from '@nestjs/common';
import { ProductVariantsController } from './product-variants.controller';

@Module({
  controllers: [ProductVariantsController]
})
export class ProductVariantsModule {}
