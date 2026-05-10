import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);

      return await this.categoryRepository.save(category);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error creating category');
    }
  }

  async findAll() {
    try {
      return await this.categoryRepository.find({ relations: ['products'] });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching categories');
    }
  }

  async findOne(id: string) {
    let category;
    try {
      category = await this.categoryRepository.findOne({
        where: { id },
        relations: ['parentCategory', 'childCategories'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching category');
    }

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    try {
      Object.assign(category, updateCategoryDto);

      return await this.categoryRepository.save(category);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating category');
    }
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    try {
      return await this.categoryRepository.remove(category);
    } catch (error) {
      throw new InternalServerErrorException('Error removing category');
    }
  }
}
