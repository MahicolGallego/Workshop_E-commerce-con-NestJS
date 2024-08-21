import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false})
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false})
  @Exclude() // Exclude from serialization
  password: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}
