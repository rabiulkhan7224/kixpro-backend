import { Expose, Type } from 'class-transformer';
import { VariantResponseDto } from 'src/product-variants/dtos/variant-response.dto';

class CategoryDto {
  @Expose() id: string;
  @Expose() name: string;
}

class MediaDto {
  @Expose() id: string;
  @Expose() url: string;
  @Expose() alt?: string;
}

export class ProductResponseDto {
  @Expose() id: string;
  @Expose() title: string;
  @Expose() slug: string;
  @Expose() description?: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;

  @Expose()
  @Type(() => CategoryDto)
  category?: CategoryDto;

  @Expose()
  @Type(() => CategoryDto)
  collection?: CategoryDto;

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
