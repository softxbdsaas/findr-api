import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ENUM_ROLES } from 'src/common/enums/user.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  /**
   * First Name
   */
  @Column({ type: 'varchar', length: 96 })
  name: string;
  /**
   * Email
   */
  @Column({ type: 'varchar', length: 96, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 96, unique: true })
  mobile: string;

  // profile_photo_path
  @Column({ type: 'varchar', length: 96 })
  profile_photo_path: string;

  // profile_photo_path
  @Column({
    type: 'enum',
    enum: ENUM_ROLES,
    nullable: true,
  })
  role?: ENUM_ROLES;
  /**
   * Password
   */
  @Column({ type: 'varchar', length: 96 })
  password: string;

  @Column({ type: 'boolean' })
  status: boolean;

  /**
   * Created At
   */
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  /**
   * Updated At
   */
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
