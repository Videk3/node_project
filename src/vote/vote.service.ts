import { Injectable } from '@nestjs/common';
import { Vote } from '../entities/vote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
  ) {}

  async create(user_id: number, lunch_id: number): Promise<Vote> {
    const data = {
      lunch: { id: lunch_id },
      user: { id: user_id },
    };
    return await this.voteRepository.save(data);
  }

  async findAll(): Promise<Vote[]> {
    return await this.voteRepository.find();
  }

  async findOne(id: number): Promise<Vote> {
    return await this.voteRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return this.voteRepository.delete(id);
  }

  async findMostVoted(): Promise<Vote> {
    return await this.voteRepository
      .createQueryBuilder('vote')
      .select('vote.lunch_id, COUNT(vote.lunch_id)', 'count')
      .where('vote.created_at >= DATE(NOW())')
      .groupBy('vote.lunch_id')
      .orderBy('count', 'DESC')
      .limit(1)
      .getRawOne();
  }
}
