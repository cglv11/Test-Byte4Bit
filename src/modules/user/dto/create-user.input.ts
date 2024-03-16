import { InputType, Field, Float } from '@nestjs/graphql';
import {
  IsEmail,
  MinLength,
  IsNumber,
  Min,
  Max,
  IsEnum,
} from 'class-validator';
import { UserStatus } from '../user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @IsEmail()
  @Field()
  email: string;

  @MinLength(6)
  @Field()
  password: string;

  @Field()
  phoneNumber: string;

  @Field({ nullable: true })
  location?: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  @Field(() => Float, { nullable: true, defaultValue: 0 })
  averageRating?: number;

  @IsEnum(UserStatus)
  @Field(() => UserStatus, { defaultValue: UserStatus.ACTIVE })
  status: UserStatus;
}
