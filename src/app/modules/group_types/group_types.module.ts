import { Module } from '@nestjs/common';
import { GroupTypesController } from './group_types.controller';
import { GroupTypesService } from './group_types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupTypes } from './entities/group_types.entity';

@Module({
  controllers: [GroupTypesController],
  providers: [GroupTypesService],
  imports: [
    TypeOrmModule.forFeature([GroupTypes]), // Register the Attendance entity with TypeOrmModule
  ]
})
export class GroupTypesModule {}
