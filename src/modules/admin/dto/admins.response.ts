import { ObjectType, Field } from '@nestjs/graphql';
import { Admin } from '../admin.entity';

@ObjectType()
export class AdminsResponse {
  @Field(() => [Admin])
  admins: Admin[];

  @Field()
  count: number;
}
