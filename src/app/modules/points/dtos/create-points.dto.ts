import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePointsDto {
  @IsInt()
  @IsNotEmpty()
  geofenceId: number;

  @IsString()
  @Length(1, 30)
  @IsNotEmpty()
  latitude: string;

  @IsString()
  @Length(1, 30)
  @IsNotEmpty()
  longitude: string;
}
