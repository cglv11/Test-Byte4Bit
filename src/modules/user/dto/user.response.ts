import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../user.entity';
import { TripCountResponse } from 'src/modules/trip/dto/count-trip.response';

@ObjectType()
export class UserResponse {
  @Field(type => User)
  user: User;

  @Field(type => TripCountResponse)
  trips: TripCountResponse;
}