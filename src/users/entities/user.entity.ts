import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Order } from 'src/order/entities/order.entity';
import { Role } from 'src/roles/entities/role.entity';
import { IsEmail } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @IsEmail()
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Exclude() // Exclude from serialization
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'int', nullable: false })
  role_id: number;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({
    name: 'role_id',
  })
  role: Role;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
