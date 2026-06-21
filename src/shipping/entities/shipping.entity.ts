import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './../../orders/entities/order.entity';

export enum ShipmentStatus {
  LABEL_CREATED = 'LABEL_CREATED',
  SHIPPED = 'SHIPPED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
}
@Entity('shipments')
export class Shipping {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToMany(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;
  @Column({ nullable: true })
  carrier: string;
  @Column({ nullable: true })
  trackingNumber: string;
  @Column({ type: 'enum', enum: ShipmentStatus, default: ShipmentStatus.LABEL_CREATED })
  status: ShipmentStatus;
  @CreateDateColumn()
  cratedAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
