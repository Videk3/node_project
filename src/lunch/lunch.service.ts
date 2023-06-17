import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lunch } from '../entities/lunch.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateLunchDto } from './dto/create-lunch.dto';

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
  async create(createLunchDto: CreateLunchDto): Promise<Lunch> {
    const lunch: Lunch = this.lunchRepository.create(createLunchDto);
    return await this.lunchRepository.save(lunch);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.lunchRepository.delete(id);
  }
}
