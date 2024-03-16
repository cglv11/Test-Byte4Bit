import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, Min, IsNumber } from 'class-validator';
import { TripStatus } from '../trip.entity';

@InputType()
export class CreateTripInput {
  @Field(() => Int)
  driverId: number;

  @Field(() => Int)
  userId: number;

  @Field()
  origin: string;

  @Field()
  destination: string;

  @IsNumber()
  @Field(() => Float)
  distance: number;

  @IsNumber()
  @Field(() => Float)
  fare: number;

  @IsInt()
  @Min(0)
  @Field(() => Int, { description: 'Duration of the trip in minutes.' })
  duration: number;

  @IsEnum(TripStatus)
  @Field(() => TripStatus, { defaultValue: TripStatus.PENDING })
  status: TripStatus;
}
