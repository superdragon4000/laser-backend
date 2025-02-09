import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum MaterialType {
  LASER = 'laser',
  THREE_D_PRINT = '3d_print',
}

@Entity()
class Material extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: MaterialType,
  })
  type: MaterialType;

  @Column('decimal')
  price: number;

  @Column()
  unit_of_measurement: string;
}

export default Material;
