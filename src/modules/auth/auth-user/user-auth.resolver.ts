// src/auth/auth.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserAuthResponse } from './user-auth-response';
import { UserAuthService } from './user-auth.service';

@Resolver()
export class UserAuthResolver {
  constructor(private userAuthService: UserAuthService) {}

  @Mutation(() => UserAuthResponse)
  async loginUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const { token, user } = await this.userAuthService.login(email, password);
    return {
      token,
      user,
    };
  }
}
