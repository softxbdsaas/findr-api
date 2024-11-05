import { PartialType } from '@nestjs/swagger';
import { CreateGeofencesDto } from './create-geofences.dto';


export class UpdateGeofencesDto extends PartialType(CreateGeofencesDto) {}
