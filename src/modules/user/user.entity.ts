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
  OneToMany,
} from 'typeorm';
import { Trip } from '../trip/trip.entity';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
});

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Column()
  password: string;

  @Column()
  @Field()
  phoneNumber: string;

  @CreateDateColumn()
  @Field(() => String)
  registrationDate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  location?: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  @Field(() => Float, { nullable: true })
  averageRating?: number;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  @Field(() => UserStatus)
  status: UserStatus;

  @CreateDateColumn()
  @Field(() => String)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt: Date;

  @OneToMany(() => Trip, trip => trip.user)
  @Field(() => [Trip], { nullable: true })
  trips?: Trip[];

  @Column({ default: true })
  state: boolean;
}
