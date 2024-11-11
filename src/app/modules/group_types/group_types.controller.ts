import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GroupTypesService } from './group_types.service';
import { CreateGroupTypeDto, UpdateGroupTypeDto } from './dtos/group-types.dto';

@Controller('group-types')
export class GroupTypesController {
  constructor(private readonly groupTypesService: GroupTypesService) {}

  @Post()
  async create(@Body() createGroupTypeDto: CreateGroupTypeDto) {
    return await this.groupTypesService.create(createGroupTypeDto);
  }
  @Get()
  async findAll() {
    return await this.groupTypesService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateGroupTypeDto: UpdateGroupTypeDto,
  ) {
    return await this.groupTypesService.update(id, updateGroupTypeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.groupTypesService.delete(id);
    return { message: 'GroupType deleted successfully' };
  }
}
