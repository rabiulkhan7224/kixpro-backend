import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      const category = this.brandRepository.create(createBrandDto);

      return await this.brandRepository.save(category);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error creating brand');
    }
  }

  async findAll() {
    try {
      return await this.brandRepository.find({ relations: ['products'] });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching brands');
    }
  }

  async findOne(id: string) {
    try {
      const brand = await this.brandRepository.findOne({
        where: { id },
        relations: ['products'],
      });
      if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
      return brand;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching brand');
    }
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    try {
      await this.brandRepository.update(id, updateBrandDto);
      return this.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating brand');
    }
  }

  async remove(id: string) {
    try {
      const brand = await this.findOne(id);
      if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
      await this.brandRepository.remove(brand);
      return brand;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error removing brand');
    }
  }
}
