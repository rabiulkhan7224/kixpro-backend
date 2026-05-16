import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { CreateProductVariantDto } from 'src/product-variants/dtos/CreateProductVariantDto';

export class CreateNestedVariantDto extends CreateProductVariantDto {
  @ApiPropertyOptional({ format: 'uuid' }) // productId will be set by service
  @IsOptional()
  productId?: string;
}
export class CreateProductWithVariantsDto {
  @ApiProperty({ description: 'The title of the product' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: 'Detailed description of the product' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: ['https://cdn.example.com/tshirt-front.jpg', 'https://cdn.example.com/tshirt-back.jpg'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiPropertyOptional({
    description: 'The ID of the category this product belongs to',
  })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'The ID of the brand this product belongs to',
  })
  @IsUUID()
  @IsOptional()
  brandId?: string;

  @ApiPropertyOptional({
    description: 'The ID of the collection this product belongs to',
  })
  @IsUUID()
  @IsOptional()
  collectionId?: string;

  @ApiPropertyOptional({
    description: 'The ID of the media associated with this product',
  })
  @ApiPropertyOptional({ type: [CreateNestedVariantDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateNestedVariantDto)
  @IsOptional()
  variants?: CreateNestedVariantDto[];
}
