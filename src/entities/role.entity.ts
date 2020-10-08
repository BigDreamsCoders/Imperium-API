import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    type => User,
    user => user.role,
  )
  users: User[];
}

@Entity()
export class Privilege {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  resource: string;

  @Column()
  action: string;

  @Column()
  possession: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

@Entity({ name: 'role_privilege' })
export class RolePrivilege {
  @ManyToOne(
    type => Role,
    role => role.id,
    { primary: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(
    type => Privilege,
    privilege => privilege.id,
    { primary: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'privilege_id' })
  privilege: Privilege;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
