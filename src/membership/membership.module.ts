import { MembershipController } from './membership.controller';
import { MembershipService } from './membership.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from '../entities/membership.entity';
import {
  MembershipState,
  MembershipType,
} from '../entities/membership.catalog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Membership, MembershipState, MembershipType]),
  ],
  controllers: [MembershipController],
  providers: [MembershipService],
})
export class MembershipModule {}
