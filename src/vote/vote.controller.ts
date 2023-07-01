import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { VoteService } from './vote.service';
import { DeleteResult } from 'typeorm';
import { Vote } from '../entities/vote.entity';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post('upvote/:id')
  @UseGuards(JwtAuthGuard)
  create(@Param('id') lunch_id: number, @Request() req) {
    return this.voteService.create(req.user.id, lunch_id);
  }

  @Get('mostvotedtoday')
  findMostVoted(): Promise<Vote> {
    return this.voteService.findMostVoted();
  }

  @Get()
  findAll(): Promise<Vote[]> {
    return this.voteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Vote> {
    return this.voteService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.voteService.remove(+id);
  }
}
