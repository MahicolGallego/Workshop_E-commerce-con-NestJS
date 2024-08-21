import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false})
  user_id: number;

  @ManyToOne(() => User, user => user.orders, { nullable: false })
  @JoinColumn({ name: "user_id"})
  user: User;

  @ManyToMany(() => Product, product => product.orders)
  @JoinTable()
  products: Product[];

  @Column({ type: 'decimal', nullable: false})
  totalPrice: number;
}
