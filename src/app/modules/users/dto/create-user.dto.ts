// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  /**
   * First Name
   */
  // @ApiProperty({
  //   description: 'User Firs Name',
  //   example: 'Jhon',
  // })
  @IsString()
  @IsNotEmpty()
  @MaxLength(96)
  first_name: string;

  /**
   * Last Name
   */
  // @ApiProperty({
  //   description: 'User Last Name',
  //   example: 'Doe',
  // })
  @IsString()
  @IsNotEmpty()
  @MaxLength(96)
  last_name: string;

  /**
   * Email
   */
  // @ApiProperty({
  //   description: 'User Email',
  //   example: 'example@gmail.com',
  // })
  @IsString()
  @IsEmail()
  @IsLowercase()
  @IsNotEmpty()
  @MaxLength(96)
  email: string;

  /**
   * Password
   */
  // @ApiProperty({
  //   description: 'User Password',
  //   example: 'Password1234@',
  // })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  password: string;

  /**
   * Created At
   */
  @IsDate()
  @IsOptional()
  create_at?: Date;

  /**
   * Updated At
   */
  @IsDate()
  @IsOptional()
  updated_at?: Date;
}
