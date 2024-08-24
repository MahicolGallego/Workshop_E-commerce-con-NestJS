import { Order } from 'src/order/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, DeleteDateColumn } from 'typeorm';

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Order, order => order.products)
  orders: Order[];
}
