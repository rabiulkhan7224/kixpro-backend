import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductResponseDto } from './dto/product-response.dto';
import { plainToInstance } from 'class-transformer';
import { VariantResponseDto } from 'src/product-variants/dtos/variant-response.dto';
import { CreateProductWithVariantsDto } from './dto/create-product-with-variants.dto';
import { ProductVariant } from 'src/product-variants/entities/product-variant.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(ProductVariant)
    private readonly variantsRepository: Repository<ProductVariant>,
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>, // Replace 'any' with your Inventory entity
    private readonly dataSource: DataSource,
  ) {}

  async added(createProductDto: CreateProductDto) {
    try {
      const product = this.productsRepository.create(createProductDto);
      return await this.productsRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Error creating product');
    }
  }
  // products.service.ts (add inside ProductService)

  async createWithVariants(dto: CreateProductWithVariantsDto): Promise<ProductResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Create the product
      const product = this.productsRepository.create({
        title: dto.title,
        description: dto.description,
        categoryId: dto.categoryId,
        collectionId: dto.collectionId,
        brandId: dto.brandId,
        images: dto.images,
      });
      const savedProduct = await queryRunner.manager.save(product);

      // 2. Create variants and their inventories
      const variants: ProductVariant[] = [];
      if (dto.variants?.length) {
        for (const variantDto of dto.variants) {
          const variant = this.variantsRepository.create({
            ...variantDto,

            productId: savedProduct.id,
            // ensure productId is set, ignore from dto
          });
          const savedVariant = await queryRunner.manager.save(variant);

          // Create inventory if provided
          if (variantDto.inventory) {
            const inventory = this.inventoryRepository.create({
              ...variantDto.inventory,
              variantId: savedVariant.id,
            });
            await queryRunner.manager.save(inventory);
          } else {
            // Optionally create a default inventory (quantity 0)
            const inventory = this.inventoryRepository.create({
              variantId: savedVariant.id,
              quantity: 0,
            });
            await queryRunner.manager.save(inventory);
          }
          variants.push(savedVariant);
        }
      }

      await queryRunner.commitTransaction();

      // 3. Return the full DTO (load fresh with relations)
      return this.findOne(savedProduct.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error; // will be caught by global filter
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<ProductResponseDto[]> {
    try {
      const products = await this.productsRepository.find({
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
      product = await this.productsRepository.findOne({
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
      return await this.productsRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Error updating product');
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    try {
      return await this.productsRepository.remove(product);
    } catch (error) {
      throw new InternalServerErrorException('Error removing product');
    }
  }

  private toResponseDto(product: Product): ProductResponseDto {
    const dto = plainToInstance(ProductResponseDto, product, {
      excludeExtraneousValues: true,
      // Ensure getters are evaluated
      // enableImplicitConversion: true,
    });
    // Enhance variants with inventory data
    if (product.variants) {
      dto.variants = product.variants.map(variant => {
        const variantDto = plainToInstance(VariantResponseDto, variant, {
          excludeExtraneousValues: true,
        });
        variantDto.availableQuantity = variant.inventory?.quantity ?? 0;
        variantDto.inStock = variantDto.availableQuantity > 0 || (variant.inventory?.allowBackorder ?? false);
        variantDto.isLowStock = variant.inventory
          ? variant.inventory.lowStockThreshold !== null &&
            variant.inventory.quantity <= variant.inventory.lowStockThreshold &&
            variant.inventory.quantity > 0
          : false;
        return variantDto;
      });
    }

    return dto;
  }
}
