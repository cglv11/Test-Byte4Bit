import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Driver } from "./driver.entity";
import { DriverService } from "./driver.service";
import { TokenService } from "../shared/services/token.service";
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';


@Resolver(of => Driver)
export class DriverResolver {
  constructor(
    private driverService: DriverService,
    private tokenService: TokenService 
  ) {}

  @Query(returns => [Driver])
  @UseGuards(GqlAuthGuard) 
  async drivers(): Promise<Driver[]> {
    return this.driverService.findAll();
  }

  @Query(returns => Driver, { nullable: true })
  @UseGuards(GqlAuthGuard) 
  async driver(@Args('id', { type: () => Int }) id: number): Promise<Driver | undefined> {
    return this.driverService.findOne(id);
  }

/*   @Mutation(returns => AuthResponse)
  async createDriver(@Args('createDriverData') createDriverData: CreateUserInput): Promise<AuthResponse> {
    const driver = await this.driverService.create(createDriverData);
    const token = this.tokenService.generateToken(user);
    return { user, token };
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard) 
  async updateUser(@Args('updateUserData') updateUserData: UpdateUserInput, @Context() context): Promise<User> {
    const requestTokenId = context.req.user.id;
    return this.driverService.update(updateUserData.id, updateUserData, requestTokenId);
  }
  
  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard) 
  async removeUser(@Args('id', { type: () => Int }) id: number, @Context() context): Promise<boolean> {
    const requestTokenId = context.req.user.id;
    await this.driverService.remove(id, requestTokenId);
    return true;
  } */
}
