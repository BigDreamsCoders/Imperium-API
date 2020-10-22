import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'building_entrance_action' })
export class BuildingEntranceAction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

@Entity({ name: 'building_entrance' })
export class BuildingEntrance {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(
    () => User,
    user => user.id,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => BuildingEntranceAction,
    action => action.id,
  )
  @JoinColumn({ name: 'building_action_id' })
  action: BuildingEntranceAction;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
