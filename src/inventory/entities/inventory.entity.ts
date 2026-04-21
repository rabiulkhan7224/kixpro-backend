import { ProductVariant } from 'src/product-variants/entites/product-variant.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('inventory')
@Index(['variantId'])
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ProductVariant, variant => variant.inventory, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;

  @Column({ name: 'variant_id' })
  variantId: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'int', nullable: true })
  lowStockThreshold: number;

  @Column({ type: 'boolean', default: false })
  allowBackorder: boolean;

  @UpdateDateColumn()
  updatedAt: Date;
}
