import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsLowercase, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * First Name
   */
  @Column({ type: 'varchar', length: 96 })
  @IsNotEmpty()
  @MaxLength(96)
  first_name: string;

  /**
   * Last Name
   */
  @Column({ type: 'varchar', length: 96 })
  @IsNotEmpty()
  @MaxLength(96)
  last_name: string;

  /**
   * Email
   */
  @Column({ type: 'varchar', length: 96, unique: true })
  @IsEmail()
  @IsLowercase()
  @IsNotEmpty()
  @MaxLength(96)
  email: string;


  /**
   * Password
   */
  @Column({ type: 'varchar', length: 96 })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  password: string;

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
