import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVariantDto } from './dtos/CreateVariant.dto';
import { UpdateVariantDto } from './dtos/UpdateVariant.dto';
import { ProductVariant } from './entites/product-variant.entity';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariant)
    private readonly variantRepository: Repository<ProductVariant>,
  ) {}

  async create(createVariantDto: CreateVariantDto) {
    try {
      const variant = this.variantRepository.create(createVariantDto);
      return await this.variantRepository.save(variant);
    } catch (error) {
      throw new InternalServerErrorException('Error creating product variant');
    }
  }

  async findAll() {
    try {
      return await this.variantRepository.find({ relations: ['product'] });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching product variants');
    }
  }

  async findOne(id: string) {
    let variant;
    try {
      variant = await this.variantRepository.findOne({
        where: { id },
        relations: ['product'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching product variant');
    }
    if (!variant) {
      throw new NotFoundException(`Product variant with ID ${id} not found`);
    }
    return variant;
  }

  async update(id: string, updateVariantDto: UpdateVariantDto) {
    const variant = await this.findOne(id);
    Object.assign(variant, updateVariantDto);
    try {
      return await this.variantRepository.save(variant);
    } catch (error) {
      throw new InternalServerErrorException('Error updating product variant');
    }
  }

  async remove(id: string) {
    const variant = await this.findOne(id);
    try {
      return await this.variantRepository.remove(variant);
    } catch (error) {
      throw new InternalServerErrorException('Error removing product variant');
    }
  }
}
