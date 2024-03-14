import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { TokenService } from '../shared/services/token.service';
import { UserAuthResponse } from '../auth/auth-user/user-auth-response';
import { UserAuthGuard } from '../auth/auth-user/user-auth.guard';
import { UserResponse } from './dto/user.response';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private tokenService: TokenService 
    ) {}

  @Query(returns => UserResponse)
  @UseGuards(UserAuthGuard) 
  async users() {
    return this.userService.findAll();
  }

  @Query(returns => User, { nullable: true })
  @UseGuards(UserAuthGuard) 
  async user(@Args('id', { type: () => Int }) id: number): Promise<User | undefined> {
    return this.userService.findOne(id);
  }

  @Mutation(returns => UserAuthResponse)
  async createUser(@Args('createUserData') createUserData: CreateUserInput): Promise<UserAuthResponse> {
    const user = await this.userService.create(createUserData);
    const token = this.tokenService.generateToken(user);
    return { user, token };
  }

  @Mutation(returns => User)
  @UseGuards(UserAuthGuard) 
  async updateUser(@Args('updateUserData') updateUserData: UpdateUserInput, @Context() context): Promise<User> {
    const requestTokenId = context.req.user.id;
    return this.userService.update(updateUserData.id, updateUserData, requestTokenId);
  }
  
  @Mutation(returns => Boolean)
  @UseGuards(UserAuthGuard) 
  async removeUser(@Args('id', { type: () => Int }) id: number, @Context() context): Promise<boolean> {
    const requestTokenId = context.req.user.id;
    await this.userService.remove(id, requestTokenId);
    return true;
  }
}
