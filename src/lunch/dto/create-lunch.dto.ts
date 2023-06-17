import { IsNotEmpty } from 'class-validator';

export class CreateLunchDto {
  @IsNotEmpty()
  name: string;
}
