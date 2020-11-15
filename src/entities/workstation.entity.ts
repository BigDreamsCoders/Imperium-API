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
  WorkstationCategory,
  WorkstationState,
  WorkstationType,
} from './workstation.catalog.entity';
@Entity()
export class Workstation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @ManyToOne(
    () => WorkstationType,
    workstationType => workstationType.id,
  )
  @JoinColumn({ name: 'workstation_type_id' })
  workstationType: WorkstationType;

  @ManyToOne(
    () => WorkstationState,
    workstationState => workstationState.id,
  )
  @JoinColumn({ name: 'workstation_state_id' })
  workstationState: WorkstationState;

  @ManyToOne(
    () => WorkstationCategory,
    category => category.id,
  )
  @JoinColumn({ name: 'workstation_category_id' })
  workstationCategory: WorkstationCategory;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
