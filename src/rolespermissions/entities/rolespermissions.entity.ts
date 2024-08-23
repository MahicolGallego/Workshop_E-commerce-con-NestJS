import { EntityModel } from 'src/entity/entities/entity.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Entity } from 'typeorm';

@Entity("roles_permissions")
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false})
  role_id: number;

  @Column({ type: 'int', nullable: false})
  entity_id: number;

  @Column({ type: 'boolean', default: false })
  can_get: boolean;
  
  @Column({ type: 'boolean', default: false })
  can_getone: boolean;
  
  @Column({ type: 'boolean', default: false })
  can_update: boolean;
  
  @Column({ type: 'boolean', default: false })
  can_delete: boolean;
  
  @Column({ type: 'boolean', default: false })
  can_create: boolean;

  @ManyToOne(() => Role, role => role.permissions, { nullable: false })
  @JoinColumn({name: "role_id"})
  role: Role;
  
  @ManyToOne(() => EntityModel, entitymodel => entitymodel.permissions, { nullable: false })
  @JoinColumn({name: "entity_id"})
  entity: EntityModel;
}
