import { PartialType } from '@nestjs/swagger';
import { CreatePointsDto } from './create-points.dto';

export class UpdatePointsDto extends PartialType(CreatePointsDto) {}
