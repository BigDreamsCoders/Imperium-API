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
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
/*
CREATE TABLE "rolePrivilege"
(
    "role_id"    INTEGER                 NOT NULL,
    privilege_id INTEGER                 NOT NULL,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at"  TIMESTAMP DEFAULT now() NOT NULL,
    PRIMARY KEY ("role_id", privilege_id)
);
*/
@Entity({ name: 'role_privilege' })
export class RolePrivilege {
  @ManyToOne(
    type => Role,
    role => role.id,
    { primary: true },
  )
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(
    type => Privilege,
    privilege => privilege.id,
    { primary: true },
  )
  @JoinColumn({ name: 'privilege_id' })
  privilege: Privilege;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
