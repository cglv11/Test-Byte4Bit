import { InputType, Field, Float } from '@nestjs/graphql';
import { UserStatus } from '../user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  phoneNumber: string;

  @Field({ nullable: true })
  location?: string;

  @Field(type => Float, { nullable: true, defaultValue: 0 })
  averageRating?: number;

  @Field(type => UserStatus, { defaultValue: UserStatus.ACTIVE })
  status: UserStatus;
}
