// export class CreateProductDto {
//     title: string;
//   description: string;
//   slug: string;
//   tags: string[];
//   images: {
//     url: string;
//     alt_text: string;
//     is_thumbnail: boolean;
//   }[];
//   seo: {
//     title: string;
//     description: string;
//     keywords: string[];
//   };
//   variants: {
//     sku: string;
//     inventory_quantity: number;
//     prices: {
//       amount: number;
//       region_id: string; 
//     }[];


//   }[];
// }



import { 
  IsString, IsOptional, IsArray, IsNumber, IsBoolean, 
  ValidateNested, IsObject, IsNotEmpty, 
  IsCurrency
} from 'class-validator';
import { Type } from 'class-transformer';

// 1. Regional Price DTO
class CreatePriceDto {
    @IsNumber()
    original_price: number;

    @IsOptional()
    @IsNumber()
    sale_price?: number;

    @IsOptional()
    @IsNumber()
    buying_price?: number;

    @IsString()
    @IsOptional()
    currency: string = 'USD';
}

// 2. Variant DTO
class CreateVariantDto {
  @IsString()
  sku: string;

  @IsString()
  variant_slug: string;

  @IsNumber()
  inventory_quantity: number;

  @IsObject()
  @IsOptional()
  seo?: Record<string, any>;

  @ValidateNested({ each: true })
  @Type(() => CreatePriceDto)
  prices: CreatePriceDto[];

  @IsArray()
  @IsString({ each: true })
  option_value_ids: string[]; // Linked to the Options created below

  @IsArray()
  @IsOptional()
  image_urls?: string[]; // URLs for variant-specific images
}

// 3. Main Product DTO
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsObject()
  @IsOptional()
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };

  
  
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  variants: CreateVariantDto[];

  @IsArray()
  @IsObject({ each: true })
  options: { title: string; values: string[] }[]; 
  @IsBoolean()
  
  isActive:boolean;
}