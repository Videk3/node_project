import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('lunch')
export class Lunch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
