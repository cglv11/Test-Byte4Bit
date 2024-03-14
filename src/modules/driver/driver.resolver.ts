import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql';
import { Driver } from "./driver.entity";
import { UseGuards } from '@nestjs/common';
import { DriverService } from "./driver.service";
import { TokenService } from "../shared/services/token.service";
import { DriverAuthGuard } from '../auth/auth-driver/driver-auth.guard';
import { DriverAuthResponse } from '../auth/auth-driver/driver-auth-response';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';


@Resolver(of => Driver)
export class DriverResolver {
  constructor(
    private driverService: DriverService,
    private tokenService: TokenService 
  ) {}

  @Query(returns => [Driver])
  @UseGuards(DriverAuthGuard) 
  async drivers(): Promise<Driver[]> {
    return this.driverService.findAll();
  }

  @Query(returns => Driver, { nullable: true })
  @UseGuards(DriverAuthGuard) 
  async driver(@Args('id', { type: () => Int }) id: number): Promise<Driver | undefined> {
    return this.driverService.findOne(id);
  }

  @Mutation(returns => DriverAuthResponse)
  async createDriver(@Args('createDriverData') createDriverData: CreateDriverInput): Promise<DriverAuthResponse> {
    const driver = await this.driverService.create(createDriverData);
    const token = this.tokenService.generateTokenDriver(driver);
    return { driver, token };
  }

  @Mutation(returns => Driver)
  @UseGuards(DriverAuthGuard) 
  async updateDriver(@Args('updateDriverData') updateDriverData: UpdateDriverInput, @Context() context): Promise<Driver> {
    const requestTokenId = context.req.user.id;
    return this.driverService.update(updateDriverData.id, updateDriverData, requestTokenId);
  }
  
  @Mutation(returns => Boolean)
  @UseGuards(DriverAuthGuard) 
  async removeDriver(@Args('id', { type: () => Int }) id: number, @Context() context): Promise<boolean> {
    const requestTokenId = context.req.user.id;
    await this.driverService.remove(id, requestTokenId);
    return true;
  }
}
