import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shipping_addresses')
export class ShippingAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: string;

  @Column()
  fullName: string;

  @Column()
  line1: string;

  @Column({ nullable: true })
  line2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;
}
