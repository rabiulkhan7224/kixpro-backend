import { Media } from 'src/medias/entities/media.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
  Index,
  Check,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('product_variants')
@Index(['sku'], { unique: true })
@Index(['productId'])
@Index(['price'])

@Check('"price" > 0')
export class ProductVariant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({ type: 'varchar', length: 100, unique: true })
  sku: string;

  @Column({ 
    type: 'decimal', 
    precision: 12, 
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value)
    }
  })
  price: number;

  @Column({ 
    type: 'decimal', 
    precision: 12, 
    scale: 2,
    nullable: true,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => value ? parseFloat(value) : null
    }
  })
  compareAtPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: true })
  costPerItem: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  size: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  color: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  material: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  style: string;

  @Column({ type: 'decimal', precision: 8, scale: 3, nullable: true })
  weight: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  weightUnit: string;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  barcode: string;

  @Column({ type: 'boolean', default: true })
  taxable: boolean;

  @Column({ type: 'jsonb', nullable: true })
  optionValues: Record<string, string>; // e.g., { "Size": "L", "Color": "Red" }

  @Column({ name: 'product_id' })
  productId: string;

  // Relationships
  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

//   @OneToOne(() => Inventory, (inventory) => inventory.variant, {
//     cascade: true,
//     eager: false,
//   })
//   inventory: Inventory;

  @OneToMany(() => Media, (media) => media.variant, {
    eager: false,
  })
  media: Media[];

//   @OneToMany(() => OrderItem, (orderItem) => orderItem.variant)
//   orderItems: OrderItem[];

  // Virtual/computed properties
  get discountPercentage(): number {
    if (!this.compareAtPrice || this.compareAtPrice <= this.price) return 0;
    return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
  }

  get hasDiscount(): boolean {
    return this.discountPercentage > 0;
  }

  get formattedPrice(): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency || 'USD',
    }).format(this.price);
  }

  get availableQuantity(): number {
    return 0; // TODO: connect to inventory entity
  }

  get inStock(): boolean {
    return false; // TODO: connect to inventory entity
  }

  get isLowStock(): boolean {
    return false; // TODO: connect to inventory entity
  }

  // Generate SKU if not provided
  @BeforeInsert()
  generateSkuIfEmpty() {
    if (!this.sku && this.product && this.optionValues) {
      const skuParts = Object.values(this.optionValues).map(val => 
        val.substring(0, 3).toUpperCase()
      );
      this.sku = `${this.product.title.substring(0, 3).toUpperCase()}-${skuParts.join('-')}`;
    }
  }

  @BeforeUpdate()
  validatePrices() {
    if (this.compareAtPrice && this.compareAtPrice < this.price) {
      this.compareAtPrice = null as any;
    }
  }
}