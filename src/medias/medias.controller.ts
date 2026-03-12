import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@ApiTags('Media')
@Controller('media')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new media record' })
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediasService.create(createMediaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all media records' })
  findAll() {
    return this.mediasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a media record by ID' })
  findOne(@Param('id') id: string) {
    return this.mediasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a media record by ID' })
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediasService.update(id, updateMediaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a media record by ID' })
  remove(@Param('id') id: string) {
    return this.mediasService.remove(id);
  }
}
