import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lunch } from '../entities/lunch.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class LunchService {
  constructor(
    @InjectRepository(Lunch) private lunchRepository: Repository<Lunch>,
  ) {}

  async findAll(): Promise<Lunch[]> {
    return await this.lunchRepository.find();
  }

  async findOne(id: number): Promise<Lunch> {
    return await this.lunchRepository.findOneBy({ id });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.lunchRepository.delete(id);
  }
}
