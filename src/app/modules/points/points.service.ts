import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Points } from './entities/points.entity';
import { Repository } from 'typeorm';
import { CreatePointsDto } from './dtos/create-points.dto';
import { UpdatePointsDto } from './dtos/update-points.dto';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Points)
    private readonly pointsRepository: Repository<Points>,
    // @Inject(forwardRef(() => UsersService))
    // private readonly usersService: UsersService,
  ) {}

  async create(createPointDto: CreatePointsDto) {
    const newPoint = this.pointsRepository.create(createPointDto);
    return await this.pointsRepository.save(newPoint);
  }

  async findAll() {
    return await this.pointsRepository.find();
  }

  async findOne(id: number) {
    const point = await this.pointsRepository.findOne({ where: { id } });
    if (!point) {
      throw new NotFoundException(`Point with ID ${id} not found`);
    }
    return point;
  }

  async update(id: number, updatePointDto: UpdatePointsDto) {
    const point = await this.findOne(id);
    if (!point) {
      throw new NotFoundException(`Point with ID ${id} not found`);
    }
    const points = { ...point, ...updatePointDto };
    return this.pointsRepository.save(points);
  }

  async remove(id: number) {
    const point = await this.findOne(id);
    return this.pointsRepository.remove(point);
  }
}
