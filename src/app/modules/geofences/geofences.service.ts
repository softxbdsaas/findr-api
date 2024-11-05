import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Geofences } from './entities/entities.entity';
import { Repository } from 'typeorm';
import { CreateGeofencesDto } from './dto/create-geofences.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class GeofencesService {
  constructor(
    @InjectRepository(Geofences)
    private readonly geofencesRepository: Repository<Geofences>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public async create(req: any, createUserDto: CreateGeofencesDto) {
    let existingGeofences = undefined;
    try {
      // Check if user exists with the same email or mobile
      existingGeofences = await this.geofencesRepository.findOne({
        where: { name: CreateGeofencesDto.name },
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        { description: 'Error connecting to the database' },
      );
    }
    const id = req.user.sub;
    const user = await this.usersService.findOneById(id);
    // Handle exception
    if (existingGeofences) {
      throw new BadRequestException(
        'The user already exists, please check your name .',
      );
    }

    // Create a new user
    let geofences = this.geofencesRepository.create({
      ...createUserDto,
      added_by: user,
    });

    try {
      geofences = await this.geofencesRepository.save(geofences);
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return geofences;
  }

  public async findAll(): Promise<Geofences[]> {
    return this.geofencesRepository.find(); // Fetch all geofences
  }

  public async findOneById(id: number): Promise<Geofences> {
    const geofence = await  this.geofencesRepository.findOne({ where: { id } });
    if (!geofence) {
      throw new NotFoundException(`Geofence with ID ${id} not found`);
    }
    return geofence;
  }

  public async update(id: number, updateGeofencesDto: CreateGeofencesDto): Promise<Geofences> {
    const geofence = await this.findOneById(id); // Find existing geofence
    const updatedGeofence = Object.assign(geofence, updateGeofencesDto); // Merge with new data
    return this.geofencesRepository.save(updatedGeofence); // Save updated geofence
  }

  public async remove(id: number): Promise<void> {
    const geofence = await this.findOneById(id);
    await this.geofencesRepository.remove(geofence); // Delete the geofence
  }

}
