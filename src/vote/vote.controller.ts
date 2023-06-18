import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { DeleteResult } from 'typeorm';
import { Vote } from '../entities/vote.entity';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  create(@Body() createVoteDto: CreateVoteDto): Promise<Vote> {
    return this.voteService.create(createVoteDto);
  }

  @Get()
  findAll(): Promise<Vote[]> {
    return this.voteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Vote> {
    return this.voteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoteDto: UpdateVoteDto) {
    return this.voteService.update(+id, updateVoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.voteService.remove(+id);
  }
}
