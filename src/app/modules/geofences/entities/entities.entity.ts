import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'geofences' })
export class Geofences {
  /**
   * Primary key
   */
  @PrimaryGeneratedColumn('increment')
  id: number;

  /**
   * Bank name
   */
  @Column({
    type: 'varchar',
    nullable: false,
    length: 256,
  })
  name: string;

  @ManyToOne(() => User, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'added_by' })
  added_by: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
