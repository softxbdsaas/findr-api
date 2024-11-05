import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('attendance') // Table name in the database
export class Attendance {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'int' })
  geofence_id: number;

  @Column({ type: 'int' })
  employee_id: number;

  @Column({ type: 'time' })
  enter_time: string;

  @Column({ type: 'time' })
  exit_time: string;

  @Column({ type: 'int', default: 0 }) // Change type to integer
  notification_type: number; // or change to boolean based on your requirement

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
