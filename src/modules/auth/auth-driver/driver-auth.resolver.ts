// src/auth/auth.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { DriverAuthService } from './driver-auth.service';
import { DriverAuthResponse } from './driver-auth-response';

@Resolver()
export class DriverAuthResolver {
  constructor(private driverAuthService: DriverAuthService) {}

  @Mutation(() => DriverAuthResponse)
  async loginDriver(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const { token, driver } = await this.driverAuthService.login(
      email,
      password,
    );
    return {
      driver,
      token,
    };
  }
}
