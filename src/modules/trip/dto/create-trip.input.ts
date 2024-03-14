import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsDecimal, IsEnum, IsInt, Min, IsNumber } from 'class-validator';
import { TripStatus } from '../trip.entity';

@InputType()
export class CreateTripInput {
  @Field(type => Int)
  driverId: number;

  @Field(type => Int)
  userId: number;

  @Field()
  origin: string;

  @Field()
  destination: string;

  @IsNumber()
  @Field(type => Float)
  distance: number;

  @IsNumber()
  @Field(type => Float)
  fare: number;

  @IsInt()
  @Min(0)
  @Field(type => Int, { description: "Duration of the trip in minutes." })
  duration: number;

  @IsEnum(TripStatus)
  @Field(type => TripStatus, { defaultValue: TripStatus.PENDING })
  status: TripStatus;
}
