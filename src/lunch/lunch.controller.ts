import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Lunch } from '../entities/lunch.entity';
import { LunchService } from './lunch.service';
import { CreateLunchDto } from './dto/create-lunch.dto';
import { DeleteResult } from 'typeorm';
import { UpdateLunchDto } from './dto/update-lunch.dto';

@Controller('lunches')
export class LunchController {
  constructor(private readonly lunchService: LunchService) {}
  @Get()
  findAll(): Promise<Lunch[]> {
    return this.lunchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Lunch> {
    return this.lunchService.findOne(+id);
  }

  @Post()
  create(@Body() createLunchDto: CreateLunchDto): Promise<Lunch> {
    return this.lunchService.create(createLunchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.lunchService.remove(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLunchDto: UpdateLunchDto,
  ): Promise<Lunch> {
    return this.lunchService.update(id, updateLunchDto);
  }
}
