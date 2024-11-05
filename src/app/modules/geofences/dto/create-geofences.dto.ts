// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateGeofencesDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(96)
  name: string;

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
