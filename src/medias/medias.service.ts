import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';

@Injectable()
export class MediasService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async create(createMediaDto: CreateMediaDto) {
    try {
      const media = this.mediaRepository.create(createMediaDto);
      return await this.mediaRepository.save(media);
    } catch (error) {
      throw new InternalServerErrorException('Error creating media record');
    }
  }

  async findAll() {
    try {
      return await this.mediaRepository.find({ relations: ['product'] });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching media records');
    }
  }

  async findOne(id: string) {
    let media;
    try {
      media = await this.mediaRepository.findOne({
        where: { id },
        relations: ['product'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching media record');
    }
    
    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return media;
  }

  async update(id: string, updateMediaDto: UpdateMediaDto) {
    const media = await this.findOne(id);
    Object.assign(media, updateMediaDto);
    try {
      return await this.mediaRepository.save(media);
    } catch (error) {
       throw new InternalServerErrorException('Error updating media record');
    }
  }

  async remove(id: string) {
    const media = await this.findOne(id);
    try {
       return await this.mediaRepository.remove(media);
    } catch (error) {
       throw new InternalServerErrorException('Error removing media record');
    }
  }
}
