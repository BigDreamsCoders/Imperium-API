import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from '../utilities/functions';
import { File } from './file.entity';
import { Membership } from './membership.entity';
import { Role } from './role.entity';
import { Routine } from './routine.entity';

@Entity()
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  birthday: Date;

  @ManyToOne(
    type => Gender,
    gender => gender.id,
  )
  @JoinColumn({ name: 'gender_id' })
  gender: Gender;

  @OneToOne(type => Membership, { cascade: ['insert'] })
  @JoinColumn({ name: 'membership_id' })
  membership: Membership;

  @ManyToOne(
    type => Role,
    role => role.id,
  )
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToOne(type => File, { cascade: ['insert'] })
  @JoinColumn({ name: 'file_id' })
  file: File;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  setPassword(password: string) {
    this.password = hash(password);
  }
  comparePassword(password: string): boolean {
    return this.password === hash(password);
  }

  @OneToMany(
    type => Routine,
    routine => routine.creator,
  )
  routines: Routine[];
}
