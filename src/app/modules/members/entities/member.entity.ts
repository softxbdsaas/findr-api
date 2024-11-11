import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Groups } from '../../groups/entities/group.entity';
@Entity('members')
export class Member {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @ManyToOne(() => Groups)
  @JoinColumn({ name: 'group_id' })
  group: Groups;

  @Column({ type: 'bigint' })
  status: number;

  @Column({ type: 'bigint' })
  added_by: number;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;
}
