import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum UserStatus {
  ADMIN = 'admin',
  MANAGER = 'manager',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  ENGINEER = 'engineer',
}

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;
}

export default User;
