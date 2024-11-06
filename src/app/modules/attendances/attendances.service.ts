import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendances.entity';
import { Repository } from 'typeorm';
import { CreateAttendanceDto } from './dto/create-attendances.dto';
import { UpdateAttendanceDto } from './dto/update-attendances.dto';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    const attendance = this.attendanceRepository.create(createAttendanceDto);
    return this.attendanceRepository.save(attendance);
  }

  async findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.find();
  }

  async findOne(id: number): Promise<Attendance> {
    const attendance = await this.attendanceRepository.findOne({ where: { id } });
    if (!attendance) {
      throw new NotFoundException(`Attendance with ID ${id} not found`);
    }
    return attendance;
  }

  async update(
    id: number,
    updateAttendanceDto: UpdateAttendanceDto,
  ): Promise<Attendance> {
    const attendance = await this.findOne(id);
    const updatedAttendance = { ...attendance, ...updateAttendanceDto };
    return this.attendanceRepository.save(updatedAttendance);
  }

  async remove(id: number) {
    const attendance = await this.findOne(id);
    return this.attendanceRepository.remove(attendance);
  }
}
