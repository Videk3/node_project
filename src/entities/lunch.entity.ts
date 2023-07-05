import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vote } from './vote.entity';
@Entity('lunch')
export class Lunch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Vote, (vote: Vote) => vote.lunch, { onDelete: 'CASCADE' })
  votes: Vote[];
}
