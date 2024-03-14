import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Trip } from "../trip.entity";

@ObjectType()
export class TripCountResponse {
  @Field(type => Int)
  count: number;

  @Field(type => [Trip])
  trips: Trip[];
}