import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { ProductVariant } from 'src/product-variants/entites/product-variant.entity';
@Entity('media')
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Column()
  productId: string;

  @ManyToOne(() => Product, product => product.media, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  product: Product;

  @Column({ nullable: true })
  variantId: string;

  @ManyToOne(() => ProductVariant, variant => variant.media, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  variant: ProductVariant;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
