import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import slugify from 'slugify';

@Entity('collections')
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  @Column({
    nullable: true,
  })
  images: string;
  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Product, product => product.collection)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Automatically generate slug from name before inserting into the database
  // and ensure it's unique by appending a short random string if necessary
  @BeforeInsert()
  generateSlug() {
    const timestamp = Date.now();
    this.slug = slugify(`${this.name}-${timestamp}`, { lower: true, strict: true });
  }
}
