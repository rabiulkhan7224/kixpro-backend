import { Product } from 'src/products/entities/product.entity';
import { Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Entity } from 'typeorm';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  image?: string;

  @OneToMany(() => Product, product => product.brand)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
