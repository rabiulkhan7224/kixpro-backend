import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsObject, IsOptional, IsPositive, IsString, Length, Min, ValidateNested } from "class-validator";
import { VariantOptionDto } from "./variant-option.dto";


export class CreateVariantDto {

  @ApiProperty({ description: 'Variant slug (URL-friendly identifier)', maxLength: 120 })
  @IsString()
  variant_slug: string;
  @ApiPropertyOptional({ description: 'SEO metadata for the variant' })

  @IsObject()
  @IsOptional()
  seo?: Record<string, any>;



  @IsArray()
  @IsString({ each: true })
  option_value_ids: string[]; // Linked to the Options created below

  @IsArray()
  @IsOptional()
  image_urls?: string[]; // URLs for variant-specific images

   @ApiProperty({ description: 'Stock Keeping Unit', maxLength: 100 })
  @IsString()
  @Length(1, 100)
  sku: string;

  @ApiProperty({ description: 'Variant price' })
  @IsNumber()
  @IsPositive()
  @Min(0.01)
  price: number;

  @ApiPropertyOptional({ description: 'Compare at price (original price)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  compareAtPrice?: number;

  @ApiPropertyOptional({ description: 'Size variant' })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  size?: string;

  @ApiPropertyOptional({ description: 'Color variant' })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  color?: string;

  @ApiPropertyOptional({ description: 'Material variant' })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  material?: string;

  @ApiPropertyOptional({ description: 'Weight in kilograms' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @ApiPropertyOptional({ description: 'Currency code', default: 'USD' })
  @IsOptional()
  @IsString()
  @Length(3, 10)
  currency?: string;

  @ApiProperty({ description: 'Initial stock quantity', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  initialQuantity?: number;
}