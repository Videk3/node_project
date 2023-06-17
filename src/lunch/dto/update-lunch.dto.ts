import { CreateLunchDto } from './create-lunch.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class UpdateLunchDto extends PartialType(CreateLunchDto) {
  @IsNotEmpty()
  name: string;
}
