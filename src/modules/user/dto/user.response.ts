import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../user.entity';

@ObjectType()
export class UserResponse {
  @Field(type => [User])
  users: User[];

  @Field()
  count: number;
}