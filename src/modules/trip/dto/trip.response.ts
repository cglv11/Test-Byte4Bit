import { ObjectType, Field } from '@nestjs/graphql';
import { Trip } from '../trip.entity';

@ObjectType()
export class TripResponse {
  @Field(() => [Trip])
  trips: Trip[];

  @Field()
  count: number;
}
