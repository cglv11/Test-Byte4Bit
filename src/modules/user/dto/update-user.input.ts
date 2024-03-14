import { InputType, Field, Float, Int, PartialType } from '@nestjs/graphql';
import { IsEmail, MinLength, Min, Max, IsEnum } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { UserStatus } from '../user.entity';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @IsEmail()
  @Field({ nullable: true })
  email?: string;

  @MinLength(6)
  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  location?: string;

  @Min(0)
  @Max(5)
  @Field(type => Float, { nullable: true })
  averageRating?: number;

  @IsEnum(UserStatus)
  @Field(type => UserStatus, { nullable: true })
  status?: UserStatus;
}
