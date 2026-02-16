import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductVariant } from 'src/product-variants/entites/productVariant.entity';

@Entity('media')
@Index(['type'])
@Index(['isPrimary'])
export class Media extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  type: string; // 'image', 'video', etc.

  @Column({ type: 'varchar', length: 100, nullable: true })
  mimeType: string;

  @Column({ type: 'boolean', default: false })
  isPrimary: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  altText: string;

  @Column({ type: 'int', nullable: true })
  width: number;

  @Column({ type: 'int', nullable: true })
  height: number;

  @Column({ name: 'product_id', nullable: true })
  productId?: string;

  @Column({ name: 'variant_id', nullable: true })
  variantId?: string;

  // Relationships
  @ManyToOne(() => Product, (product) => product.media, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @ManyToOne(() => ProductVariant, (variant) => variant.media, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'variant_id' })
  variant?: ProductVariant;
}
