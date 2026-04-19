import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from './collection.entity';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}

  async create(createCollectionDto: CreateCollectionDto) {
    try {
      const collection = this.collectionRepository.create(createCollectionDto);
      return await this.collectionRepository.save(collection);
    } catch (error) {
      throw new InternalServerErrorException('Error creating collection');
    }
  }

  async findAll() {
    try {
      return await this.collectionRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching collections');
    }
  }

  async findOne(id: string) {
    let collection;
    try {
      collection = await this.collectionRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching collection');
    }

    if (!collection) {
      throw new NotFoundException(`Collection with ID ${id} not found`);
    }
    return collection;
  }

  async update(id: string, updateCollectionDto: UpdateCollectionDto) {
    const collection = await this.findOne(id);
    Object.assign(collection, updateCollectionDto);

    try {
      return await this.collectionRepository.save(collection);
    } catch (error) {
      throw new InternalServerErrorException('Error updating collection');
    }
  }

  async remove(id: string) {
    const collection = await this.findOne(id);

    try {
      return await this.collectionRepository.remove(collection);
    } catch (error) {
      throw new InternalServerErrorException('Error removing collection');
    }
  }
}
