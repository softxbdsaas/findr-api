import { Module } from '@nestjs/common';
import { AttendancesController } from './attendances.controller';
import { AttendancesService } from './attendances.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendances.entity';


@Module({
  controllers: [AttendancesController],
  providers: [AttendancesService],
  imports: [
    TypeOrmModule.forFeature([Attendance]), // Register the Attendance entity with TypeOrmModule
  ],
})
export class AttendancesModule {}
