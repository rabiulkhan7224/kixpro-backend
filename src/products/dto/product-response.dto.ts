import { Expose, Type } from 'class-transformer';
import { VariantResponseDto } from 'src/product-variants/dtos/variant-response.dto';

class CategoryDto {
  @Expose() id: string;
  @Expose() name: string;
}

class CollectionDto {
  @Expose() id: string;
  @Expose() title: string;
}

class MediaDto {
  @Expose() id: string;
  @Expose() url: string;
  @Expose() alt?: string;
}
class brandDTO {
  @Expose() id: string;
  @Expose() name: string;
}

export class ProductResponseDto {
  @Expose() id: string;
  @Expose() title: string;
  @Expose() slug: string;
  @Expose() description?: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
  @Expose() images: string[];

  @Expose()
  @Type(() => CategoryDto)
  category?: CategoryDto;

  @Expose()
  @Type(() => CollectionDto)
  collection?: CollectionDto;
  @Expose()
  @Type(() => brandDTO)
  brand?: brandDTO;

  @Expose()
  @Type(() => MediaDto)
  featuredMedia?: MediaDto;

  @Expose()
  @Type(() => VariantResponseDto)
  variants: VariantResponseDto[];

  // Computed aggregate fields
  @Expose()
  get minPrice(): number {
    return this.variants?.length ? Math.min(...this.variants.map(v => v.price)) : 0;
  }

  @Expose()
  get maxPrice(): number {
    return this.variants?.length ? Math.max(...this.variants.map(v => v.price)) : 0;
  }

  @Expose()
  get totalStock(): number {
    return this.variants?.reduce((sum, v) => sum + (v.availableQuantity || 0), 0) || 0;
  }
}
