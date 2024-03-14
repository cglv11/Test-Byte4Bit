import { ObjectType, Field } from '@nestjs/graphql';
import { Driver } from '../driver.entity';
import { TripCountResponse } from 'src/modules/trip/dto/count-trip.response';

@ObjectType()
export class DriverResponse {
  @Field(type => Driver)
  driver: Driver;

  @Field(type => TripCountResponse)
  trips: TripCountResponse;
}
