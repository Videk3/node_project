import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Lunch } from './lunch.entity';
@Entity('vote')
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user: User) => user.votes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Lunch, (lunch: Lunch) => lunch.votes)
  @JoinColumn({ name: 'lunch_id' })
  lunch: Lunch;
}
