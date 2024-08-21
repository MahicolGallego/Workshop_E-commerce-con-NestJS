import { Order } from 'src/order/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToMany(() => Order, order => order.products, {nullable: false})
  @JoinTable()
  orders: Order[];
}
