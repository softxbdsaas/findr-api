import { Module } from '@nestjs/common';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { Points } from './entities/points.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PointsController],
  providers: [PointsService],
  imports: [
    TypeOrmModule.forFeature([Points]), // Ensure Points entity is correctly defined
  ],
})
export class PointsModule {}
