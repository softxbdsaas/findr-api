import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { GeofencesService } from './geofences.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthType } from '../auth/enums/auth-type.enum';
import { CreateGeofencesDto } from './dto/create-geofences.dto';

@Controller('geofences')
export class GeofencesController {
  constructor(private readonly geofencesService: GeofencesService) {}

  @Post()
  @Auth(AuthType.Bearer)
  create(@Req() req, @Body() createUserDto: CreateGeofencesDto) {
    return this.geofencesService.create(req, createUserDto);
  }


  @Get()
  @Auth(AuthType.Bearer)
  findAll() {
    return this.geofencesService.findAll(); // Get all geofences
  }

  @Get(':id')
  @Auth(AuthType.Bearer)
  findOne(@Param('id') id: number) {
    return this.geofencesService.findOneById(id); // Get a specific geofence
  }

  @Put(':id')
  @Auth(AuthType.Bearer)
  update(@Param('id') id: number, @Body() updateGeofencesDto: CreateGeofencesDto) {
    return this.geofencesService.update(id, updateGeofencesDto); // Update a specific geofence
  }

  @Delete(':id')
  @Auth(AuthType.Bearer)
  remove(@Param('id') id: number) {
    return this.geofencesService.remove(id); // Delete a specific geofence
  }
   
  
}
