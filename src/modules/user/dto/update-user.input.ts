import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { UserStatus } from '../user.entity';

@InputType()
export class UpdateUserInput {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  // La contraseña normalmente no se incluye en los DTOs de actualización por razones de seguridad
  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  location?: string;

  @Field(type => Float, { nullable: true })
  averageRating?: number;

  // La actualización del estado puede requerir un manejo especial según la lógica de tu aplicación
  @Field(type => UserStatus, { nullable: true })
  status?: UserStatus;
}
