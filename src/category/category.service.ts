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
      let parentCategory = null;
      if (createCategoryDto.parentCategoryId) {
        parentCategory = await this.findOne(createCategoryDto.parentCategoryId);
      }

      const category = this.categoryRepository.create({
        ...createCategoryDto,
        parentCategory: parentCategory || undefined,
      });
      return await this.categoryRepository.save(category);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error creating category');
    }
  }

  async findAll() {
    try {
      return await this.categoryRepository.find({
        relations: ['parentCategory', 'childCategories'],
      });
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
      if (updateCategoryDto.parentCategoryId !== undefined) {
        if (updateCategoryDto.parentCategoryId === null) {
          category.parentCategory = null as any;
        } else {
          category.parentCategory = await this.findOne(updateCategoryDto.parentCategoryId);
        }
      }

      if (updateCategoryDto.name) category.name = updateCategoryDto.name;
      if (updateCategoryDto.slug) category.slug = updateCategoryDto.slug;

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
