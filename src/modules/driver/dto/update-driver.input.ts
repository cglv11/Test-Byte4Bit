import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateDriverInput } from './create-driver.input';

@InputType()
export class UpdateDriverInput extends PartialType(CreateDriverInput) {
  @Field(() => Int)
  id: number;
}
