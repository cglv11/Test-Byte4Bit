import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateAdminInput } from './create-admin.input';

@InputType()
export class UpdateAdminInput extends PartialType(CreateAdminInput) {
  @Field(type => Int)
  id: number;
}
