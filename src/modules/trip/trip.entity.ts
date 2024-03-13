import { ObjectType, Field, Int, Float, registerEnumType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Driver } from '../driver/driver.entity'; // Asegúrate de importar el modelo correcto
import { User } from '../user/user.entity'; // Asegúrate de importar el modelo correcto

export enum TripStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

registerEnumType(TripStatus, {
  name: 'TripStatus',
});

@Entity({ name: 'trips' })
@ObjectType()
export class Trip {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @ManyToOne(() => Driver)
  @Field(type => Driver)
  driver: Driver;

  @ManyToOne(() => User)
  @Field(type => User)
  user: User;

  @Column()
  @Field()
  origin: string;

  @Column()
  @Field()
  destination: string;

  @Column()
  @Field()
  startDateTime: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  endDateTime?: Date;

  @Column({ type: 'decimal' })
  @Field(type => Float)
  distance: number;

  @Column({ type: 'decimal' })
  @Field(type => Float)
  fare: number;

  @Column({
    type: "enum",
    enum: TripStatus,
    default: TripStatus.PENDING
  })
  @Field(type => TripStatus)
  status: TripStatus;

  @CreateDateColumn()
  @Field(type => String)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(type => String)
  updatedAt: Date;

}
