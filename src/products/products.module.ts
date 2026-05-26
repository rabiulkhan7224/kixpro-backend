import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductVariant } from 'src/product-variants/entities/product-variant.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Category } from 'src/category/entities/category.entity';
import { Collection } from 'src/collections/entities/collection.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product, ProductVariant, Inventory, Category, Collection])],
})
export class ProductsModule {}
