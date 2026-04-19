import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Collection } from '../../collections/collection.entity';
import { Category } from '../../category/entities/category.entity';
import { ProductVariant } from '../../product-variants/entites/product-variant.entity';
import { Media } from '../../medias/entities/media.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @Column({ nullable: true })
  collectionId: string;

  @ManyToOne(() => Collection, collection => collection.products)
  collection: Collection;

  @OneToMany(() => ProductVariant, variant => variant.product)
  variants: ProductVariant[];

  @OneToMany(() => Media, media => media.product)
  media: Media[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
