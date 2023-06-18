import { IsNotEmpty } from 'class-validator';

export class CreateVoteDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  lunch_id: number;
}
