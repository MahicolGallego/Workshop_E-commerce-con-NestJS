import { RolePermission } from 'src/rolespermissions/entities/rolespermission.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false})
  role: string;

  @OneToMany(() => RolePermission, permissions => permissions.role)
  permissions: RolePermission[];
}
