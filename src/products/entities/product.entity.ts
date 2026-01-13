import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
// import { ProductVariant } from './product-variant.entity';
// import { ProductCategory } from './product-category.entity';
// import { ProductImage } from './product-image.entity';
// import { ProductOption } from './product-option.entity';
// import { Tag } from './tag.entity';
// import { ShippingProfile } from './shipping-profile.entity';
import { Collection } from 'src/collections/collection.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', unique: true })
  slug: string; // The "handle" used in URLs (e.g., 'mens-summer-tshirt')

  @Column({ type: 'varchar', nullable: true })
  subtitle: string;

  // --- SEO & Metadata ---
  @Column({ type: 'jsonb', nullable: true })
  seo_metadata: {
    title?: string;
    description?: string;
    keywords?: string[];
  };

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>; // For custom fields (e.g., fabric weight, care instructions)

  // --- Relationships ---

  // 1. Variations (Size, Color, Material)
//   @OneToMany(() => ProductOption, (option) => option.product, { cascade: true })
//   options: ProductOption[];

//   // 2. Sellable Items (SKUs)
//   @OneToMany(() => ProductVariant, (variant) => variant.product, { cascade: true })
//   variants: ProductVariant[];

//   // 3. Media
//   @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
//   images: ProductImage[];

@ManyToMany(() => Collection, (collection) => collection.products)
  @JoinTable({
    name: 'product_collections_link', // This table will appear in pgAdmin
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'collection_id', referencedColumnName: 'id' }
  })
  collections: Collection[];

//   @ManyToMany(() => Tag, (tag) => tag.products)
//   @JoinTable({ name: 'product_tag_mapping' })
//   tags: Tag[];

//   // 5. Logistics
//   @ManyToOne(() => ShippingProfile, (profile) => profile.products)
//   shipping_profile: ShippingProfile;

  // --- Timestamps ---
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}