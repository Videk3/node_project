import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Vote } from '../entities/vote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
  ) {}

  async create(createVoteDto: CreateVoteDto): Promise<Vote> {
    const vote: Vote = this.voteRepository.create({
      lunch: { id: createVoteDto.lunch_id },
      user: { id: createVoteDto.user_id },
    });
    return await this.voteRepository.save(vote);
  }

  async findAll(): Promise<Vote[]> {
    return await this.voteRepository.find();
  }

  async findOne(id: number): Promise<Vote> {
    return await this.voteRepository.findOneBy({ id });
  }

  async update(id: number, updateVoteDto: UpdateVoteDto) {
    return `This action updates a #${id} vote`;
  }

  async remove(id: number) {
    return this.voteRepository.delete(id);
  }
}
