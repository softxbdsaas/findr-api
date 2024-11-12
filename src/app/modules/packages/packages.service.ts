import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Packages } from './entities/package.entity';
import { CreatePackageDto, UpdatePackageDto } from './dtos/package.dto';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Packages)
    private readonly packagesRepository: Repository<Packages>,
  ) {}

  async create(req: any, createPackageDto: CreatePackageDto) {
    const group = this.packagesRepository.create(createPackageDto);
    return this.packagesRepository.save(group);
  }

  async findAll() {
    return await this.packagesRepository.find();
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    const Types = await this.packagesRepository.findOneBy({ id });
    const updateGroup = { ...Types, ...updatePackageDto };
    return this.packagesRepository.save(updateGroup);
  }

  async delete(id: number): Promise<void> {
    await this.packagesRepository.delete(id);
  }
}
