import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';

@Module({
  controllers: [MembersController],
  providers: [MembersService],
  imports: [
    TypeOrmModule.forFeature([Member]), // Register the Attendance entity with TypeOrmModule
  ]
})
export class MembersModule {}
