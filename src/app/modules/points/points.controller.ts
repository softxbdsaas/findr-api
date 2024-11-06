import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePointsDto } from './dtos/create-points.dto';
import { PointsService } from './points.service';
import { UpdatePointsDto } from './dtos/update-points.dto';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Post()
  create(@Body() createPointDto: CreatePointsDto) {
    return this.pointsService.create(createPointDto);
  }

  @Get()
  findAll() {
    return this.pointsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pointsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePointDto: UpdatePointsDto) {
    return this.pointsService.update(id, updatePointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pointsService.remove(id);
  }
}
