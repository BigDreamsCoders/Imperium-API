import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  WorkstationState,
  WorkstationType,
} from './workstation.catalog.entity';
@Entity()
export class Workstation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  img: string;

  @ManyToOne(
    type => WorkstationType,
    workstationType => workstationType.id,
  )
  @JoinColumn({ name: 'workstation_type_id' })
  workstationType: WorkstationType;

  @ManyToOne(
    type => WorkstationState,
    workstationState => workstationState.id,
  )
  @JoinColumn({ name: 'workstation_state_id' })
  workstationState: WorkstationState;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
