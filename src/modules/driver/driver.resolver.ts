import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql';
import { Driver } from './driver.entity';
import { UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import { TokenService } from '../shared/services/token.service';
import { DriverAuthGuard } from '../auth/auth-driver/driver-auth.guard';
import { DriverAuthResponse } from '../auth/auth-driver/driver-auth-response';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';
import { DriversResponse } from './dto/drivers.response';
import { DriverResponse } from './dto/driver.response';
import { AdminAuthGuard } from '../auth/auth-admin/admin-auth.guard';

@Resolver(() => Driver)
export class DriverResolver {
  constructor(
    private driverService: DriverService,
    private tokenService: TokenService,
  ) {}

  @Query(() => DriversResponse)
  @UseGuards(AdminAuthGuard)
  async drivers() {
    return this.driverService.findAll();
  }

  @Query(() => DriverResponse, { nullable: true })
  @UseGuards(DriverAuthGuard)
  async driver(@Args('id', { type: () => Int }) id: number) {
    return this.driverService.findOne(id);
  }

  @Mutation(() => DriverAuthResponse)
  async createDriver(
    @Args('createDriverData') createDriverData: CreateDriverInput,
  ) {
    const driver = await this.driverService.create(createDriverData);
    const token = this.tokenService.generateTokenDriver(driver);
    return { driver, token };
  }

  @Mutation(() => Driver)
  @UseGuards(DriverAuthGuard)
  async updateDriver(
    @Args('updateDriverData') updateDriverData: UpdateDriverInput,
    @Context() context,
  ) {
    const requestTokenId = context.req.user.driver.id;
    return this.driverService.update(
      updateDriverData.id,
      updateDriverData,
      requestTokenId,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(DriverAuthGuard)
  async removeDriver(
    @Args('id', { type: () => Int }) id: number,
    @Context() context,
  ) {
    const requestTokenId = context.req.user.driver.id;
    await this.driverService.remove(id, requestTokenId);
    return true;
  }
}
