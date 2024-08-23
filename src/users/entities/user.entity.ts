import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Order } from 'src/order/entities/order.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false})
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false})
  @Exclude() // Exclude from serialization
  password: string;

  @Column({ type: 'int', nullable: false})
  role_id: number;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Role, role => role.users)
  @JoinColumn({
    name: "role_id",
  })
  role: Role;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}
