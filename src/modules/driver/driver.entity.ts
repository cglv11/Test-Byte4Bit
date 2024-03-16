import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Trip } from '../trip/trip.entity';

@Entity({ name: 'drivers' })
@ObjectType()
export class Driver {
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
  @Field()
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ unique: true })
  @Field()
  licenseNumber: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  @Field(() => Float)
  averageRating: number;

  @Column({ default: false })
  @Field({ defaultValue: false })
  availability: boolean;

  @CreateDateColumn()
  @Field(() => String)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt: Date;

  @OneToMany(() => Trip, trip => trip.driver)
  @Field(() => [Trip], { nullable: true })
  trips?: Trip[];

  @Column({ default: true })
  @Field()
  state: boolean;
}
