import {
  Entity,
  Column,
  ManyToMany,
  Tree,
  TreeChildren,
  TreeParent,
  Index,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Product } from 'src/products/entities/product.entity';
import { generateSlug } from 'src/common/utils/slug-generator';

@Entity('categories')
@Tree('materialized-path')
@Index(['slug'], { unique: true })
@Index(['parentId'])
@Index(['isActive'])
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
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

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  metaTitle: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  metaDescription: string;

  @Column({ name: 'parent_id', type: 'uuid', nullable: true })
  parentId: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];

  // Virtual/computed properties
  get productCount(): number {
    return this.products?.length || 0;
  }

  get fullPath(): string[] {
    const path: string[] = [];
    let current: Category = this;
    
    while (current) {
      path.unshift(current.name);
      current = current.parent;
    }
    
    return path;
  }

  get isLeaf(): boolean {
    return !this.children || this.children.length === 0;
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

  @Exclude()
  deletedAt: Date;
}
