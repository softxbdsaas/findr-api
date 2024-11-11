import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GroupTypes } from '../../group_types/entities/group_types.entity';
import { User } from '../../users/entities/user.entity';

@Entity('groups')
export class Groups {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'bigint' })
  group_type_id: number;

  @ManyToOne(() => GroupTypes)
  @JoinColumn({ name: 'group_type' })
  groupType: GroupTypes;

  @Column({ type: 'time' })
  check_in_time: Date;

  @Column({ type: 'time' })
  check_out_time: Date;

  @Column({ type: 'bigint' })
  added_by: number;

  @ManyToOne(() => User, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'added_by' })
  user: User;

  // Automatically sets the current timestamp when the entity is created
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // Automatically sets the current timestamp when the entity is updated
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
