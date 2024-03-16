import {
  ObjectType,
  Field,
  Int,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Driver } from '../driver/driver.entity';
import { User } from '../user/user.entity';

export enum TripStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(TripStatus, {
  name: 'TripStatus',
});

@Entity({ name: 'trips' })
@ObjectType()
export class Trip {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Driver)
  @Field(() => Driver)
  driver: Driver;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @Column()
  @Field()
  origin: string;

  @Column()
  @Field()
  destination: string;

  @CreateDateColumn()
  @Field()
  startDateTime: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  endDateTime?: Date;

  @Column({ type: 'decimal' })
  @Field(() => Float)
  distance: number;

  @Column({ type: 'decimal' })
  @Field(() => Float)
  fare: number;

  @Column({ nullable: true, type: 'bigint' })
  @Field(() => Int, { nullable: true })
  duration?: number;

  @Column({
    type: 'enum',
    enum: TripStatus,
    default: TripStatus.PENDING,
  })
  @Field(() => TripStatus)
  status: TripStatus;

  @CreateDateColumn()
  @Field(() => String)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt: Date;

  @Column({ default: true })
  @Field()
  state: boolean;
}
