import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { AuthResponse } from '../auth/auth-response';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../shared/services/token.service';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private tokenService: TokenService 
    ) {}

  @Query(returns => [User])
  @UseGuards(GqlAuthGuard) 
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(returns => User, { nullable: true })
  @UseGuards(GqlAuthGuard) 
  async user(@Args('id', { type: () => Int }) id: number): Promise<User | undefined> {
    return this.userService.findOne(id);
  }

  @Mutation(returns => AuthResponse)
  async createUser(@Args('createUserData') createUserData: CreateUserInput): Promise<AuthResponse> {
    const user = await this.userService.create(createUserData);
    const token = this.tokenService.generateToken(user);
    return { user, token };
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard) 
  async updateUser(@Args('updateUserData') updateUserData: UpdateUserInput, @Context() context): Promise<User> {
    const requestUserId = context.req.user.id;
    return this.userService.update(updateUserData.id, updateUserData, requestUserId);
  }
  
  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard) 
  async removeUser(@Args('id', { type: () => Int }) id: number, @Context() context): Promise<boolean> {
    const requestUserId = context.req.user.id;
    await this.userService.remove(id, requestUserId);
    return true;
  }
}
