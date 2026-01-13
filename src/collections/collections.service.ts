import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';

@Injectable()
export class CollectionsService {
  constructor(
    /**
     * Injecting CollectionRepository
     */
    @InjectRepository(Collection)
    private CollectionRepository: Repository<Collection>,
  ) {}
  public async create(createCollectionDto: CreateCollectionDto) {
    let newCollection = this.CollectionRepository.create(createCollectionDto);

    newCollection = await this.CollectionRepository.save(newCollection);
    return newCollection;
  }

  findAll() {
    return `This action returns all collections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collection`;
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
