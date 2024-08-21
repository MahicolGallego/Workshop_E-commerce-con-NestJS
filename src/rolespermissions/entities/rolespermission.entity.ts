import { Role } from 'src/roles/entities/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export class RolePermission {
    @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, role => role.permissions, { nullable: false })
  role: Role;

  @ManyToOne(() => EntityModel, entity => entity.permissions, { nullable: false })
  entity: EntityModel;

  @Column({ type: 'boolean', default: false })
  canGet: boolean;

  @Column({ type: 'boolean', default: false })
  canGetOne: boolean;

  @Column({ type: 'boolean', default: false })
  canUpdate: boolean;

    @Column({ type: 'boolean', default: false })
  canDelete: boolean;

  @Column({ type: 'boolean', default: false })
  canCreate: boolean;
}
