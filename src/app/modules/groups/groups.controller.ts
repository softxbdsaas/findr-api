import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto, UpdateGroupDto } from './dtos/group.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthType } from '../auth/enums/auth-type.enum';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @Auth(AuthType.Bearer)
  async create(@Req() req, @Body() createGroupTypeDto: CreateGroupDto) {
    return  await this.groupsService.create(req, createGroupTypeDto);
  
  }
  @Get()
  async findAll() {
    return await this.groupsService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateGroupTypeDto: UpdateGroupDto,
  ) {
    return await this.groupsService.update(id, updateGroupTypeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.groupsService.delete(id);
    return { message: 'GroupType deleted successfully' };
  }
}
