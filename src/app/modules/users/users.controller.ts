import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthType } from '../auth/enums/auth-type.enum';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth(AuthType.None)
  create(@Req() req: Request, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(req, createUserDto);
  }

  @Get('/profile')
  public async getProfile(@Req() req) {
    return await this.usersService.findOneById(req.user.sub);
  }
}
