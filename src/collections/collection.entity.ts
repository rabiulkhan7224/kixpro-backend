import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('collections')
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 96, nullable: false })
  title: string;
  @Column({ type: 'varchar', length: 96, nullable: false, unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 96, nullable: true })
  imageUrl?: string;
  @Column({ type: 'varchar', length: 96, nullable: false })
  description: string;
  @Column({ type: 'varchar', length: 96, nullable: true })
  videoUrl?: string;
  @ManyToMany(() => Product, (product) => product.collections)
  products: Product[];
  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  // Add this decorartor and column enables soft delete
  @DeleteDateColumn()
  deletedAt: Date;
}
