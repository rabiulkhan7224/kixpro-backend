import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

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

  async findAll() {
    try {
      return await this.productRepository.find({ relations: ['category', 'collection'] });
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
}
