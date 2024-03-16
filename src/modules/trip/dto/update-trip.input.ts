import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateTripInput } from './create-trip.input';

@InputType()
export class UpdateTripInput extends PartialType(CreateTripInput) {
  @Field(() => Int)
  id: number;
}
