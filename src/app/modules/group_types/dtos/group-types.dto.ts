// src/group-types/dto/group-type.dto.ts
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateGroupTypeDto {
  @IsString()
  @MaxLength(50)
  name: string;
}

export class UpdateGroupTypeDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

}
