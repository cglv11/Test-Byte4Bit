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
import { UsersResponse } from './dto/users.response';
import { AdminAuthGuard } from '../auth/auth-admin/admin-auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  @Query(() => UsersResponse)
  @UseGuards(AdminAuthGuard)
  async users() {
    return this.userService.findAll();
  }

  @Query(() => UserResponse, { nullable: true })
  @UseGuards(UserAuthGuard)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => UserAuthResponse)
  async createUser(@Args('createUserData') createUserData: CreateUserInput) {
    const user = await this.userService.create(createUserData);
    const token = this.tokenService.generateToken(user);
    return { user, token };
  }

  @Mutation(() => User)
  @UseGuards(UserAuthGuard)
  async updateUser(
    @Args('updateUserData') updateUserData: UpdateUserInput,
    @Context() context,
  ) {
    const requestTokenId = context.req.user.user.id;
    return this.userService.update(
      updateUserData.id,
      updateUserData,
      requestTokenId,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(UserAuthGuard)
  async removeUser(
    @Args('id', { type: () => Int }) id: number,
    @Context() context,
  ) {
    const requestTokenId = context.req.user.user.id;
    await this.userService.remove(id, requestTokenId);
    return true;
  }
}
