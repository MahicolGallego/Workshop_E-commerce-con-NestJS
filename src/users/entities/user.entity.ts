import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude() // Exclude from serialization
  password: string;

  @Column({ type: 'varchar', length: 50, default: 'user' })
  role: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}
