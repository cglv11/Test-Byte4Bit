import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../user.entity';
import { TripCountResponse } from 'src/modules/trip/dto/count-trip.response';

@ObjectType()
export class UserResponse {
  @Field(() => User)
  user: User;

  @Field(() => TripCountResponse)
  trips: TripCountResponse;
}
