import { IsString, IsNotEmpty, IsNumber, IsOptional, IsObject, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVariantDto {
  @ApiProperty({ description: 'The ID of the product this variant belongs to' })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'Stock Keeping Unit (SKU)' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ description: 'Price of the product variant' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'Available stock quantity' })
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiPropertyOptional({ description: 'JSON object containing attributes like Size, Color, etc.', type: Object })
  @IsObject()
  @IsOptional()
  attributes?: Record<string, any>;
}