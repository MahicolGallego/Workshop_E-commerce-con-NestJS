import { EntityModel } from 'src/entity/entities/entity.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false})
  role_id: number;

  @Column({ type: 'int', nullable: false})
  entity_id: number;

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

  @ManyToOne(() => Role, role => role.permissions, { nullable: false })
  @JoinColumn({name: "role_id"})
  role: Role;
  
  @ManyToOne(() => EntityModel, entity => entity.permissions, { nullable: false })
  @JoinColumn({name: "entity_id"})
  entity: EntityModel;
}
