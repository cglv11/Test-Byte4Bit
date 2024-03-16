// src/auth/auth.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AdminAuthResponse } from './admin-auth-response';
import { AdminAuthService } from './admin-auth.service';

@Resolver()
export class AdminAuthResolver {
  constructor(private adminAuthService: AdminAuthService) {}

  @Mutation(() => AdminAuthResponse)
  async loginAdmin(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const { token, admin } = await this.adminAuthService.login(email, password);
    return {
      token,
      admin,
    };
  }
}
