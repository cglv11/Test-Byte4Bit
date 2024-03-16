import { InputType, Field, Float } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateDriverInput {
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

  @IsNotEmpty()
  @Field()
  phoneNumber: string;

  @Field()
  licenseNumber: string;

  @Field(() => Float, { defaultValue: 0.0 })
  averageRating?: number;

  @Field({ defaultValue: false })
  availability?: boolean;
}
