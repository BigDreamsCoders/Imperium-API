import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { WorkstationCategory } from './workstation.catalog.entity';
import { Workstation } from './workstation.entity';

@Entity()
export class Routine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => WorkstationCategory)
  @JoinTable()
  workstation: WorkstationCategory[];

  @ManyToOne(
    () => User,
    user => user.id,
  )
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

@Entity()
export class RoutineData {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Workstation,
    workstation => workstation.id,
  )
  @JoinColumn({ name: 'workstation_id' })
  workstation: Workstation;

  @Column({ nullable: true })
  time: string;

  @Column({ nullable: true })
  calories: string;

  @Column({ nullable: true, type: 'integer' })
  repetition: number;

  @Column({ nullable: true, type: 'integer' })
  sets: number;
}

@Entity()
export class RoutineHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Routine,
    routine => routine.id,
  )
  @JoinColumn({ name: 'routine_id' })
  routine: Routine;

  @ManyToOne(
    () => User,
    user => user.id,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => RoutineData, { cascade: ['insert'] })
  @JoinTable()
  data: RoutineData[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
