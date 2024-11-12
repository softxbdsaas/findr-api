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
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthType } from '../auth/enums/auth-type.enum';
import { PackagesService } from './packages.service';
import { CreatePackageDto, UpdatePackageDto } from './dtos/package.dto';
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  @Auth(AuthType.Bearer)
  async create(@Req() req, @Body() createPackageDto: CreatePackageDto) {
    return await this.packagesService.create(req, createPackageDto);
  }
  @Get()
  async findAll() {
    return await this.packagesService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePackageDto: UpdatePackageDto,
  ) {
    return await this.packagesService.update(id, updatePackageDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.packagesService.delete(id);
    return { message: 'Package deleted successfully' };
  }
}
