import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateInventoryDto } from 'src/inventory/dto/create-inventory.dto';

export class CreateProductVariantDto {
  @ApiProperty({ description: 'Stock Keeping Unit (SKU)' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ description: 'Price of the product variant' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiPropertyOptional({
    description: 'JSON object containing attributes like Size, Color, etc.',
    type: Object,
  })
  @IsObject()
  @IsOptional()
  attributes?: Record<string, any>;

  // ProductVariant entity has additional fields like compareAtPrice, costPerItem, size, color, material, style, weight, weightUnit, currency, barcode, taxable, optionValues. You can add them here as needed with appropriate validation decorators.
  @ApiPropertyOptional({ description: 'Compare at price for discounts' })
  @IsNumber()
  @IsOptional()
  compareAtPrice?: number;

  @ApiPropertyOptional({ description: 'Cost per item for profit calculations' })
  @IsNumber()
  @IsOptional()
  costPerItem?: number;

  @ApiPropertyOptional({ description: 'Size of the product variant' })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiPropertyOptional({ description: 'Color of the product variant' })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({ description: 'Material of the product variant' })
  @IsString()
  @IsOptional()
  material?: string;

  @ApiPropertyOptional({ description: 'Style of the product variant' })
  @IsString()
  @IsOptional()
  style?: string;

  @ApiPropertyOptional({ description: 'Weight of the product variant' })
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiPropertyOptional({ description: 'Weight unit (e.g., kg, lb)' })
  @IsString()
  @IsOptional()
  weightUnit?: string;

  @ApiPropertyOptional({ description: 'Currency code (e.g., USD)' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiPropertyOptional({ description: 'Barcode for the product variant' })
  @IsString()
  @IsOptional()
  barcode?: string;

  @ApiPropertyOptional({ description: 'Whether the product variant is taxable' })
  @IsOptional()
  taxable?: boolean;

  @ApiPropertyOptional({
    description: 'Option values for the variant (e.g., { "Size": "L", "Color": "Red" })',
    type: Object,
  })
  @IsObject()
  @IsOptional()
  optionValues?: Record<string, string>;
  // inventory

  // ---- Inventory (replaces the old "stock" field) ----
  @ApiPropertyOptional({ type: CreateInventoryDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateInventoryDto)
  inventory?: CreateInventoryDto;
}
