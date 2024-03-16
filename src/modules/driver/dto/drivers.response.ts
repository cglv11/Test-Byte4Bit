import { ObjectType, Field } from '@nestjs/graphql';
import { Driver } from '../driver.entity';

@ObjectType()
export class DriversResponse {
  @Field(() => [Driver])
  drivers: Driver[];

  @Field()
  count: number;
}
