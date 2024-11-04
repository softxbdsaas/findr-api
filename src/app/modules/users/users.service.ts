import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  public async create(req: Request, createUserDto: CreateUserDto) {
    // Check if the user already exists by email
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException(
        'The user already exists, please check your email.',
      );
    }

    const newUser = this.usersRepository.create({
      ...createUserDto,
    });
    // Save new user to the database and send OTP for verification
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
