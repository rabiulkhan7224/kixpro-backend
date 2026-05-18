import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductResponseDto } from './dto/product-response.dto';
import { plainToInstance } from 'class-transformer';
import { VariantResponseDto } from 'src/product-variants/dtos/variant-response.dto';
import { CreateProductWithVariantsDto } from './dto/create-product-with-variants.dto';
import { ProductVariant } from 'src/product-variants/entities/product-variant.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { FilterProductsDto } from './dto/filter-products.dto';
import { PaginatedResult } from 'src/common/interfaces/paginated-result.interface';

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
    console.log('Creating product with variants:', dto);
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
      console.log('saveproduct result', savedProduct);
      // 2. Create variants and their inventories
      const variants: ProductVariant[] = [];
      if (dto.variants?.length) {
        for (const variantDto of dto.variants) {
          // Destructure inventory to exclude from variant creation
          const { inventory: inventoryDto, ...variantData } = variantDto;

          const variant = this.variantsRepository.create({
            ...variantData,
            productId: savedProduct.id,
          });
          const savedVariant = await queryRunner.manager.save(variant);

          // Create inventory with all fields
          if (inventoryDto) {
            const inventory = this.inventoryRepository.create({
              variantId: savedVariant.id,
              quantity: inventoryDto.quantity ?? 0,
              lowStockThreshold: inventoryDto.lowStockThreshold,
              allowBackorder: inventoryDto.allowBackorder ?? false,
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
      console.log('Error creating product with variants:', error);
      throw error; // will be caught by global filter
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(filters: FilterProductsDto): Promise<PaginatedResult<ProductResponseDto>> {
    try {
      // const products = await this.productsRepository.find({
      //   relations: ['category', 'collection', 'variants', 'variants.inventory', 'media'],
      // });

      const query = this.productsRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.collection', 'collection')
        .leftJoinAndSelect('product.media', 'media')
        .leftJoinAndSelect('product.variants', 'variant')
        .leftJoinAndSelect('variant.inventory', 'inventory');

      // ---------- FILTERS ----------
      if (filters.categoryId) {
        query.andWhere('product.categoryId = :categoryId', { categoryId: filters.categoryId });
      }

      if (filters.collectionId) {
        query.andWhere('product.collectionId = :collectionId', { collectionId: filters.collectionId });
      }

      if (filters.search) {
        query.andWhere(
          new Brackets(qb => {
            qb.where('product.title ILIKE :search', { search: `%${filters.search}%` }).orWhere(
              'product.description ILIKE :search',
              { search: `%${filters.search}%` },
            );
          }),
        );
      }
      if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        query.andWhere(
          `EXISTS (
          SELECT 1 FROM product_variants pv
          WHERE pv.product_id = product.id
          AND pv.price BETWEEN :minPrice AND :maxPrice
        )`,
          {
            minPrice: filters.minPrice ?? 0,
            maxPrice: filters.maxPrice ?? 9999999,
          },
        );
      }

      if (filters.inStock) {
        query.andWhere(
          `EXISTS (
          SELECT 1 FROM product_variants pv2
          JOIN inventory inv ON inv.variant_id = pv2.id
          WHERE pv2.product_id = product.id
          AND (inv.quantity > 0 OR inv.allowBackorder = true)
        )`,
        );
      }

      // ---------- SORTING ----------
      const allowedSortFields: Record<string, string> = {
        title: 'product.title',
        createdAt: 'product.createdAt',
        // For price sorting you'd need grouping, here we keep it simple
      };
      if (filters.sortBy && allowedSortFields[filters.sortBy]) {
        query.orderBy(allowedSortFields[filters.sortBy], filters.sortOrder);
      } else {
        query.orderBy('product.createdAt', 'DESC');
      }

      // ---------- PAGINATION ----------
      const [products, total] = await query
        .skip((filters.page - 1) * filters.limit)
        .take(filters.limit)
        .getManyAndCount();

      // Transform to DTOs
      const items = products.map(product => this.toResponseDto(product));

      // Transform to response DTO with computed fields
      return {
        items,
        meta: {
          total,
          page: filters.page,
          limit: filters.limit || 20,
          totalPages: Math.ceil(total / filters.limit),
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Error fetching products');
    }
  }

  async findOne(id: string) {
    let product;
    try {
      product = await this.productsRepository.findOne({
        where: { id },
        relations: ['category', 'collection', 'variants', 'variants.inventory', 'media'],
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
