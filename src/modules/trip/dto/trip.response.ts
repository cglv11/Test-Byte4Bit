import { ObjectType, Field } from '@nestjs/graphql';
import { Trip } from '../trip.entity';

@ObjectType()
export class TripResponse {
  @Field(type => [Trip])
  trips: Trip[];

  @Field()
  count: number;
}