import { InputType, Field, Float, Int, PartialType } from '@nestjs/graphql';
import { IsEmail, MinLength, IsNumber } from 'class-validator';
import { CreateDriverInput } from './create-driver.input';

@InputType()
export class UpdateDriverInput extends PartialType(CreateDriverInput){
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
  licenseNumber?: string;

  @IsNumber()
  @Field(type => Float, { nullable: true })
  averageRating?: number;

  @Field({ nullable: true })
  availability?: boolean;
}
