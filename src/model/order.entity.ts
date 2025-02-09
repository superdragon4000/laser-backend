import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import User from './user.entity';
import Material from './material.entity';

export enum ServiceType {
  LASER = 'laser',
  THREE_D_PRINT = '3d_print',
}

export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity()
class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user_id: User;

  @Column()
  file_url: string;

  @Column({
    type: 'enum',
    enum: ServiceType,
  })
  service_type: ServiceType;

  @ManyToOne(() => Material, (material) => material.id)
  material: Material;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  assigned_to: User;

  @Column()
  created_at: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_paid: boolean;
}

export default Order;
