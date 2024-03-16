import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Trip } from '../trip.entity';

@ObjectType()
export class TripCountResponse {
  @Field(() => Int)
  count: number;

  @Field(() => [Trip])
  trips: Trip[];
}
