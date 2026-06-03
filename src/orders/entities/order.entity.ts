// orders/entities/order.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatusHistory } from './order-status-history.entity';
import { OrderStatus } from './order-status.enum';

@Entity('orders')
@Index(['userId'])
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column('decimal', { precision: 12, scale: 2 })
  totalAmount: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // Shipping address – either inline or via relation (shown as relation)
  //   @ManyToOne(() => ShippingAddress, { nullable: true, eager: true })
  //   @JoinColumn({ name: 'shippingAddressId' })
  //   shippingAddress: ShippingAddress;

  @Column({ nullable: true })
  shippingAddressId: string;

  // Payment may be created later
  //   @OneToOne(() => Payment, (payment) => payment.order, { nullable: true })
  //   payment: Payment;

  // Items
  @OneToMany(() => OrderItem, item => item.order, { cascade: true })
  items: OrderItem[];

  // Status audit trail
  @OneToMany(() => OrderStatusHistory, hist => hist.order, { cascade: true })
  statusHistory: OrderStatusHistory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
