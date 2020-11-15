import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'medic_file' })
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric' })
  weight: number;

  @Column({ type: 'numeric' })
  height: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
