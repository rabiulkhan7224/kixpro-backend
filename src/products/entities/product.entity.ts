import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  Index,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductStatus } from '../enums/product-status.enum';
import { Media } from 'src/medias/entities/media.entity';
import { Category } from 'src/category/entities/category.entity';
import { Collection } from 'src/collections/collection.entity';
import { generateSlug } from 'src/common/utils/slug-generator';
import { Exclude } from 'class-transformer';
import { ProductVariant } from 'src/product-variants/entites/productVariant.entity';
@Entity('products')
@Index(['slug'], { unique: true })
@Index(['status'])
@Index(['brand'])
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  brand: string;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.DRAFT,
  })
  status: ProductStatus;

  // SEO Fields
  @Column({ type: 'varchar', length: 255, nullable: true })
  metaTitle: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  metaDescription: string;

  // Product Type
  @Column({ type: 'varchar', length: 50, nullable: true })
  type: string; // e.g., 'physical', 'digital'

  // Product Options (for variant generation)
  @Column({ type: 'jsonb', nullable: true })
  options: Array<{
    name: string; // e.g., 'Size', 'Color'
    values: string[]; // e.g., ['S', 'M', 'L'], ['Red', 'Blue']
  }>;

  // Shipping
  @Column({ type: 'boolean', default: true })
  requiresShipping: boolean;

  @Column({ type: 'boolean', default: false })
  isGiftCard: boolean;

  // Tags for search and filtering
  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  // Custom fields for extensibility
  @Column({ type: 'jsonb', nullable: true })
  customFields: Record<string, any>;

  // Relationships
  @OneToMany(() => ProductVariant, (variant) => variant.product, {
    cascade: true,
    eager: false,
  })
  variants: ProductVariant[];

  @OneToMany(() => Media, (media) => media.product, {
    cascade: true,
    eager: false,
  })
  media: Media[];

  @ManyToMany(() => Category, (category) => category.products, {
    eager: false,
  })
  @JoinTable({
    name: 'product_categories',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];

  @ManyToMany(() => Collection, (collection) => collection.products, {
    eager: false,
  })
  @JoinTable({
    name: 'product_collections',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'collection_id', referencedColumnName: 'id' },
  })
  collections: Collection[];

  // Virtual/computed properties (not stored in DB)
  get minPrice(): number {
    if (!this.variants || this.variants.length === 0) return 0;
    return Math.min(...this.variants.map(v => v.price));
  }

  get maxPrice(): number {
    if (!this.variants || this.variants.length === 0) return 0;
    return Math.max(...this.variants.map(v => v.price));
  }

  get hasDiscount(): boolean {
    if (!this.variants) return false;
    return this.variants.some(v => v.compareAtPrice && v.compareAtPrice > v.price);
  }

  // get isInStock(): boolean {
  //   if (!this.variants) return false;
  //   return this.variants.some(v => v.inventory?.availableQuantity > 0);
  // }

  // get totalInventory(): number {
  //   if (!this.variants) return 0;
  //   return this.variants.reduce((sum, v) => sum + (v.inventory?.quantity || 0), 0);
  // }

  get primaryImage(): Media | null {
    if (!this.media || this.media.length === 0) return null;
    const primary = this.media.find(m => m.isPrimary && m.type === 'image');
    return primary || this.media[0];
  }

  // Hooks
  @BeforeInsert()
  @BeforeUpdate()
  generateSlugIfEmpty() {
    if (!this.slug && this.title) {
      this.slug = generateSlug(this.title);
    }
    
    // Ensure meta title defaults to product title
    if (!this.metaTitle) {
      this.metaTitle = this.title;
    }
    
    // Ensure meta description has a default
    if (!this.metaDescription && this.description) {
      this.metaDescription = this.description.substring(0, 160);
    }
  }

  // For class-transformer serialization
  @Exclude()
  deletedAt: Date;
}