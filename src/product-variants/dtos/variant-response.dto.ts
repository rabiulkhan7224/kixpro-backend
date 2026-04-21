import { Expose, Type } from 'class-transformer';

export class VariantResponseDto {
  @Expose() id: string;
  @Expose() sku: string;
  @Expose() price: number;
  @Expose() compareAtPrice?: number;
  @Expose() size?: string;
  @Expose() color?: string;
  @Expose() material?: string;
  @Expose() style?: string;
  @Expose() weight?: number;
  @Expose() weightUnit?: string;
  @Expose() optionValues?: Record<string, string>;

  // Computed fields (need to be exposed explicitly)
  @Expose()
  get discountPercentage(): number {
    if (!this.compareAtPrice || this.compareAtPrice <= this.price) return 0;
    return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
  }

  @Expose()
  get formattedPrice(): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD', // could be passed from entity
    }).format(this.price);
  }

  // Inventory‑derived fields (populated from joined data)
  @Expose() availableQuantity: number;
  @Expose() inStock: boolean;
  @Expose() isLowStock: boolean;
}
