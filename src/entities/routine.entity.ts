import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoutineType } from './routine.catalog.entity';
import { User } from './user.entity';

@Entity()
export class Routine {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: 'suggested_time' })
  suggestedTime: number;

  @ManyToOne(
    type => User,
    user => user.id,
  )
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @ManyToOne(
    type => RoutineType,
    routine => routine.id,
  )
  @JoinColumn({ name: 'routine_type_id' })
  routineType: RoutineType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
