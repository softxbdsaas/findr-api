import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { CreateMemberDto, UpdateMemberDto } from './dtos/member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>,
  ) {}

  async create(req: any, createMemberDto: CreateMemberDto) {
    const id = req.user.sub;

    const group = this.membersRepository.create({
      ...createMemberDto,
      added_by: id,
    });
    return this.membersRepository.save(group);
  }

  async findAll() {
    return await this.membersRepository.find();
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    const Types = await this.membersRepository.findOneBy({ id });
    const updateGroup = { ...Types, ...updateMemberDto };
    return this.membersRepository.save(updateGroup);
  }

  async delete(id: number): Promise<void> {
    await this.membersRepository.delete(id);
  }
}
