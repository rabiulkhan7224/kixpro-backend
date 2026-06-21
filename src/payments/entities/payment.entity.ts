import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  STRIPE = 'stripe',
  PAYPAL = 'paypal',
  // etc.
}

@Entity('payments')
@Index(['orderId'])
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order, order => order.payment, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column()
  orderId: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ type: 'enum', enum: PaymentMethod })
  method: PaymentMethod;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Column({ nullable: true })
  externalId: string; // Stripe PaymentIntent ID

  @Column('jsonb', { nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
