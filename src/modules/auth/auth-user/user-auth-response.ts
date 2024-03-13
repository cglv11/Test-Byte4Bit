import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/modules/user/user.entity";
import { Driver } from "typeorm";

@ObjectType()
export class UserAuthResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}