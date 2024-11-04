import { Body, Controller, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Req() req: Request, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(req, createUserDto);
  }
}
