import { Exclude } from 'class-transformer';
import { generateSlug } from 'src/common/utils/slug-generator';
import { Product } from 'src/products/entities/product.entity';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CollectionType } from './enums/collection-type.enum';


@Entity('collections')
@Index(['slug'], { unique: true })
@Index(['type'])
@Index(['isActive'])
export class Collection extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 96, nullable: true })
  videoUrl?: string;


   @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 120 })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  bannerImage: string;

  @Column({
    type: 'enum',
    enum: CollectionType,
    default: CollectionType.MANUAL,
  })
  type: CollectionType;

  @Column({ type: 'jsonb', nullable: true })
  conditions: {
    field: string;
    operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains';
    value: any;
  }[];

  @Column({ type: 'boolean', default: false })
  isAutomated: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  metaTitle: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  metaDescription: string;

  @ManyToMany(() => Product, (product) => product.collections)
  products: Product[];

  // Virtual/computed properties
  get productCount(): number {
    return this.products?.length || 0;
  }

  get isDynamic(): boolean {
    return this.isAutomated || this.type === CollectionType.AUTOMATED;
  }

  @BeforeInsert()
  @BeforeUpdate()
  generateSlugIfEmpty() {
    if (!this.slug && this.name) {
      this.slug = generateSlug(this.name);
    }
    
    if (!this.metaTitle) {
      this.metaTitle = this.name;
    }
  }

 
}
