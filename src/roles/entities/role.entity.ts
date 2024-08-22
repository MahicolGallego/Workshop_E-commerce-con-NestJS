import { RolePermission } from 'src/rolespermissions/entities/rolespermission.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false})
  role: string;

  @ManyToMany(() => User, user => user.role)
  users: User[];

  @OneToMany(() => RolePermission, permissions => permissions.role)
  permissions: RolePermission[];
}
