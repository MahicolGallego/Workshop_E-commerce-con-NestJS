import { RolePermission } from "src/rolespermissions/entities/rolespermission.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EntityModel {
    @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  entity: string;

  @OneToMany(() => RolePermission, permissions => permissions.entity)
  permissions: RolePermission[];
}
