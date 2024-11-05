import { forwardRef, Module } from '@nestjs/common';
import { GeofencesController } from './geofences.controller';
import { GeofencesService } from './geofences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geofences } from './entities/entities.entity';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [GeofencesController],
  providers: [GeofencesService],
  imports: [
    TypeOrmModule.forFeature([Geofences]), // Ensure Geofences entity is correctly defined
    forwardRef(() => UsersModule), // Forward reference to avoid circular dependency
  ],
  exports: [GeofencesService],
})
export class GeofencesModule {}

