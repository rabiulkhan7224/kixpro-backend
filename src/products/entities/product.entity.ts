import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  Index,
} from 'typeorm';
import { Collection } from '../../collections/entities/collection.entity';
import { Category } from '../../category/entities/category.entity';
import { ProductVariant } from '../../product-variants/entities/product-variant.entity';
import { Media } from '../../medias/entities/media.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import slugify from 'slugify';

@Entity('products')
@Index(['id'])
@Index(['slug'])
@Index(['categoryId'])
@Index(['collectionId'])
@Index(['brandId'])
@Index(['mediaId'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @Column({ nullable: true })
  collectionId: string;
  @Column({ nullable: true })
  mediaId: string;
  @Column({ nullable: true })
  brandId: string;
  @ManyToOne(() => Brand, brand => brand.products)
  brand: Brand;

  @ManyToOne(() => Collection, collection => collection.products)
  collection: Collection;

  @OneToMany(() => ProductVariant, variant => variant.product)
  variants: ProductVariant[];

  @OneToMany(() => Media, media => media.product)
  media: Media[];

  @Column({ type: 'enum', enum: ['active', 'inactive', 'archived'], default: 'active' })
  status: 'active' | 'inactive' | 'archived';
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  // slug unique title and timestamp based and generated automatically from title
  generateSlug() {
    const timestamp = Date.now();
    this.slug = slugify(`${this.title}-${timestamp}`, { lower: true, strict: true });
  }
}
