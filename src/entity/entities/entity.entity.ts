

import { RolePermission } from "src/rolespermissions/entities/rolespermissions.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("entities")
export class EntityModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @OneToMany(() => RolePermission, rolepermission => rolepermission.entity)
  permissions: RolePermission[];
}
