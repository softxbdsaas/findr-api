import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupTypes } from './entities/group_types.entity';
import { Repository } from 'typeorm';
import { CreateGroupTypeDto, UpdateGroupTypeDto } from './dtos/group-types.dto';

@Injectable()
export class GroupTypesService {
  constructor(
    @InjectRepository(GroupTypes)
    private readonly groupTypesRepository: Repository<GroupTypes>,
  ) {}

  async create(createGroupTypeDto: CreateGroupTypeDto) {
    const groupTypes = this.groupTypesRepository.create(createGroupTypeDto);
    return this.groupTypesRepository.save(groupTypes);
  }
  
  async findAll() {
    return await this.groupTypesRepository.find();
  }

  async update(id: number, updateGroupTypeDto: UpdateGroupTypeDto) {
     const groupTypes= await this.groupTypesRepository.findOneBy({id});
     const updateGroupType = { ...groupTypes, ...updateGroupTypeDto };
     return this.groupTypesRepository.save(updateGroupType);
  }

  async delete(id: number): Promise<void> {
    await this.groupTypesRepository.delete(id);
  }

}
