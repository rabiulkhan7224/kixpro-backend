import { Type } from "class-transformer";
import { IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

//  Variant DTO
export class CreateVariantDto {
  @IsString()
  sku: string;

  @IsString()
  variant_slug: string;

  @IsNumber()
  inventory_quantity: number;

  @IsObject()
  @IsOptional()
  seo?: Record<string, any>;

//   @ValidateNested({ each: true })
//   @Type(() => CreatePriceDto)
//   prices: CreatePriceDto[];

  @IsArray()
  @IsString({ each: true })
  option_value_ids: string[]; // Linked to the Options created below

  @IsArray()
  @IsOptional()
  image_urls?: string[]; // URLs for variant-specific images
}