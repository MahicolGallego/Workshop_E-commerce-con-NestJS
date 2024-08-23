import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';

@Entity("orders")
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false})
  user_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false})
  totalPrice: number;

  @ManyToOne(() => User, user => user.orders, { nullable: false })
  @JoinColumn({ name: "user_id"})
  user: User;

  @ManyToMany(() => Product)
  @JoinTable({
    name: "order_products",
    joinColumn: {
      name: "order_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "product_id",
      referencedColumnName: "id"
    }
  })
  products: Product[];

}
