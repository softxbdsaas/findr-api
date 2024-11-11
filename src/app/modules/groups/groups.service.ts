import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Groups } from './entities/group.entity';
import { CreateGroupDto, UpdateGroupDto } from './dtos/group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Groups)
    private readonly groupRepository: Repository<Groups>,
  ) {}

  async create(req: any, createGroupDto: CreateGroupDto) {
    const id = req.user.sub;

    const group = this.groupRepository.create({
      ...createGroupDto,
      added_by: id,
      check_in_time: new Date(createGroupDto.check_in_time),
      check_out_time: new Date(createGroupDto.check_out_time),
    });
    return this.groupRepository.save(group);
  }

  async findAll() {
    return await this.groupRepository.find();
  }

  async update(id: number, updateGroupTypeDto: UpdateGroupDto) {
    const groupTypes = await this.groupRepository.findOneBy({ id });
    const updateGroup = { ...groupTypes, ...updateGroupTypeDto };
    return this.groupRepository.save(updateGroup);
  }

  async delete(id: number): Promise<void> {
    await this.groupRepository.delete(id);
  }
}
