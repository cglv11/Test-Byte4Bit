import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity({ name: 'admins' })
@ObjectType()
export class Admin {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
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
  @Field(type => String)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(type => String)
  updatedAt: Date;

  @Column({ default: true })
  state: boolean; 
}
