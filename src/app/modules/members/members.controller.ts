import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { MembersService } from './members.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthType } from '../auth/enums/auth-type.enum';
import { CreateMemberDto, UpdateMemberDto } from './dtos/member.dto';

@Controller('members')
export class MembersController {

    constructor(private readonly membersService: MembersService) {}

    @Post()
    @Auth(AuthType.Bearer)
    async create(@Req() req, @Body() createMemberDto: CreateMemberDto) {
      return    await this.membersService.create(req, createMemberDto);
    
    }
    @Get()
    async findAll() {
      return await this.membersService.findAll();
    }
  
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() updateMemberDto: UpdateMemberDto,
    ) {
      return await this.membersService.update(id, updateMemberDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: number) {
      await this.membersService.delete(id);
      return { message: 'GroupType deleted successfully' };
    }
}
