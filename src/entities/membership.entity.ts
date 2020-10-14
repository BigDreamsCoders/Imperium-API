import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MembershipState, MembershipType } from './membership.catalog.entity';

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

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
