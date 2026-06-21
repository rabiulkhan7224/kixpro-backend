import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { ProductResponseDto } from './dto/product-response.dto';
import { CreateProductWithVariantsDto } from './dto/create-product-with-variants.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
import { PaginatedResult } from 'src/common/interfaces/paginated-result.interface';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  create(@Body() createProductDto: CreateProductDto) {
    // Generate slug from title
    return this.productsService.added(createProductDto);
  }

  @Post('with-variants')
  @ApiOperation({ summary: 'Create a product with its variants in one request' })
  @ApiResponse({ status: 201, description: 'Product created', type: ProductResponseDto })
  async createWithVariants(@Body() dto: CreateProductWithVariantsDto): Promise<ProductResponseDto> {
    return this.productsService.createWithVariants(dto);
  }
  @ApiResponse({
    status: 200,
    type: PaginatedResponseDto(ProductResponseDto),
  })
  @Get()
  async findAll(@Query() filters: FilterProductsDto): Promise<PaginatedResult<ProductResponseDto>> {
    return this.productsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.productsService.findOne(id);
  }
  //  find by slug
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a product by slug' })
  findBySlug(@Param('slug') slug: string): Promise<ProductResponseDto> {
    return this.productsService.findBySlug(slug);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
