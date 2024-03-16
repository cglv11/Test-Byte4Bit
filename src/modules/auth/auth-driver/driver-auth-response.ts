import { Field, ObjectType } from '@nestjs/graphql';
import { Driver } from 'src/modules/driver/driver.entity';

@ObjectType()
export class DriverAuthResponse {
  @Field()
  token: string;

  @Field(() => Driver)
  driver: Driver;
}
