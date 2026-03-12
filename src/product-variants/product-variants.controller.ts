import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductVariantsService } from './product-variants.service';
import { CreateVariantDto } from './dtos/CreateVariant.dto';
import { UpdateVariantDto } from './dtos/UpdateVariant.dto';

@ApiTags('Product Variants')
@Controller('variants')
export class ProductVariantsController {
  constructor(private readonly productVariantsService: ProductVariantsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product variant' })
  create(@Body() createVariantDto: CreateVariantDto) {
    return this.productVariantsService.create(createVariantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all product variants' })
  findAll() {
    return this.productVariantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product variant by ID' })
  findOne(@Param('id') id: string) {
    return this.productVariantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product variant by ID' })
  update(@Param('id') id: string, @Body() updateVariantDto: UpdateVariantDto) {
    return this.productVariantsService.update(id, updateVariantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product variant by ID' })
  remove(@Param('id') id: string) {
    return this.productVariantsService.remove(id);
  }
}
