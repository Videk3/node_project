import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vote } from './vote.entity';
@Entity('lunch')
export class Lunch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  score: number;

  @OneToMany(() => Vote, (vote: Vote) => vote.lunch)
  votes: Vote[];
}
