import { IsString, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'The title of the product' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The unique slug for the product' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiPropertyOptional({ description: 'Detailed description of the product' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'The ID of the category this product belongs to',
  })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'The ID of the collection this product belongs to',
  })
  @IsUUID()
  @IsOptional()
  collectionId?: string;

  @ApiPropertyOptional({
    description: 'The ID of the media associated with this product',
  })
  @IsUUID()
  @IsOptional()
  mediaId?: string;
}
