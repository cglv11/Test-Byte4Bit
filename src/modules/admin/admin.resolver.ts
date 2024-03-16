import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TokenService } from '../shared/services/token.service';
import { AdminsResponse } from './dto/admins.response';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-user.input';
import { AdminAuthResponse } from '../auth/auth-admin/admin-auth-response';
import { AdminAuthGuard } from '../auth/auth-admin/admin-auth.guard';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(
    private adminService: AdminService,
    private tokenService: TokenService,
  ) {}

  @Query(() => AdminsResponse)
  @UseGuards(AdminAuthGuard)
  async admins() {
    return this.adminService.findAll();
  }

  @Query(() => Admin, { nullable: true })
  @UseGuards(AdminAuthGuard)
  async admin(@Args('id', { type: () => Int }) id: number) {
    return this.adminService.findOne(id);
  }

  @Mutation(() => AdminAuthResponse)
  async createAdmin(
    @Args('createAdminData') createAdminData: CreateAdminInput,
  ) {
    const admin = await this.adminService.create(createAdminData);
    const token = this.tokenService.generateTokenAdmin(admin);
    return { admin, token };
  }

  @Mutation(() => Admin)
  @UseGuards(AdminAuthGuard)
  async updateAdmin(
    @Args('updateUserData') updateAdminData: UpdateAdminInput,
    @Context() context,
  ) {
    const requestTokenId = context.req.user.admin.id;
    return this.adminService.update(
      updateAdminData.id,
      updateAdminData,
      requestTokenId,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(AdminAuthGuard)
  async removeAdmin(
    @Args('id', { type: () => Int }) id: number,
    @Context() context,
  ) {
    const requestTokenId = context.req.user.admin.id;
    await this.adminService.remove(id, requestTokenId);
    return true;
  }
}
