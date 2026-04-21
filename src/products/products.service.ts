import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductResponseDto } from './dto/product-response.dto';
import { plainToInstance } from 'class-transformer';
import { VariantResponseDto } from 'src/product-variants/dtos/variant-response.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Error creating product');
    }
  }

  async findAll(): Promise<ProductResponseDto[]> {
    try {
      const products = await this.productRepository.find({
        relations: ['category', 'collection', 'variants', 'media'],
      });

      // Transform to response DTO with computed fields
      return products.map(product => this.toResponseDto(product));
    } catch (error) {
      throw new InternalServerErrorException('Error fetching products');
    }
  }

  async findOne(id: string) {
    let product;
    try {
      product = await this.productRepository.findOne({
        where: { id },
        relations: ['category', 'collection', 'variants', 'media'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching product');
    }

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    try {
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Error updating product');
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    try {
      return await this.productRepository.remove(product);
    } catch (error) {
      throw new InternalServerErrorException('Error removing product');
    }
  }

  private toResponseDto(product: Product): ProductResponseDto {
    const dto = plainToInstance(ProductResponseDto, product, {
      excludeExtraneousValues: true,
      // Ensure getters are evaluated
      enableImplicitConversion: true,
    });
    // Enhance variants with inventory data
    if (product.variants) {
      dto.variants = product.variants.map(variant => {
        const variantDto = plainToInstance(VariantResponseDto, variant, {
          excludeExtraneousValues: true,
        });
        // variantDto.availableQuantity = variant.inventory?.quantity ?? 0;
        // variantDto.inStock = variantDto.availableQuantity > 0 || (variant.inventory?.allowBackorder ?? false);
        // variantDto.isLowStock = variant.inventory
        //   ? variant.inventory.lowStockThreshold !== null &&
        //     variant.inventory.quantity <= variant.inventory.lowStockThreshold &&
        //     variant.inventory.quantity > 0
        //   : false;
        return variantDto;
      });
    }

    return dto;
  }
}
