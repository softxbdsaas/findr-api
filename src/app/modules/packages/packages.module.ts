import { Module } from '@nestjs/common';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Packages } from './entities/package.entity';

@Module({
  controllers: [PackagesController],
  providers: [PackagesService],
  imports: [
    TypeOrmModule.forFeature([Packages]), // Register the Attendance entity with TypeOrmModule
  ],
})
export class PackagesModule {}
