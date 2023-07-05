import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Lunch } from './lunch.entity';
@Entity('vote')
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lunch, (lunch: Lunch) => lunch.votes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lunch_id' })
  lunch: Lunch;

  @ManyToOne(() => User, (user: User) => user.votes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
