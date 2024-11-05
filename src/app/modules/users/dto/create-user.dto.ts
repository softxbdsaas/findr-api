// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ENUM_ROLES } from 'src/common/enums/user.enum';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(96)
  name: string;

  @IsString()
  @IsEmail()
  @IsLowercase()
  @IsNotEmpty()
  @MaxLength(96)
  email: string;

  @IsBoolean()
  status: boolean;

  @IsEnum(ENUM_ROLES)
  role: ENUM_ROLES;

  @IsString()
  profile_photo_path: string;

  @IsString()
  mobile: string;

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
  created_at?: Date;

  /**
   * Updated At
   */
  @IsDate()
  @IsOptional()
  updated_at?: Date;
}
