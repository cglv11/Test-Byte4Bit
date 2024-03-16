import { Field, ObjectType } from '@nestjs/graphql';
import { Admin } from '../../admin/admin.entity';

@ObjectType()
export class AdminAuthResponse {
  @Field()
  token: string;

  @Field(() => Admin)
  admin: Admin;
}
