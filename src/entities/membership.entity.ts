import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'membership_type' })
export class MembershipType {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

@Entity({ name: 'membership_state' })
export class MembershipState {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(
    type => MembershipType,
    membership => membership.id,
  )
  @JoinColumn({ name: 'membership_type' })
  membershipType: MembershipType;

  @ManyToOne(
    type => MembershipState,
    membership => membership.id,
  )
  @JoinColumn({ name: 'membership_state' })
  membershipState: MembershipState;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
