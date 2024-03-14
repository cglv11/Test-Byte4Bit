import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TripService } from './trip.service';
import { Trip } from './trip.entity';
import { CreateTripInput } from './dto/create-trip.input';
import { UpdateTripInput } from './dto/update-trip.input';
import { DriverAuthGuard } from '../auth/auth-driver/driver-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Trip)
export class TripResolver {
  constructor(private readonly tripService: TripService) {}

  @Query(() => [Trip], { name: 'trips' })
  async findAll() {
    return this.tripService.findAll();
  }

  @Query(() => Trip, { name: 'trip', nullable: true })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tripService.findOne(id);
  }

  @Mutation(() => Trip)
  async createTrip(@Args('createTripData') createTripData: CreateTripInput) {
    console.log('this is create data: ',createTripData);
    return this.tripService.create(createTripData);
  }

  @Mutation(() => Trip)
  async updateTrip(
    @Args('updateTripData') updateTripData: UpdateTripInput,
  ) {
    return this.tripService.update(updateTripData.id, updateTripData);
  }

  @Mutation(() => Boolean)
  async deleteTrip(@Args('id', { type: () => Int }) id: number) {
    return this.tripService.delete(id).then(() => true).catch(() => false);
  }

  @Mutation(returns => Trip)
  async finalizeTrip(
    @Args('id', { type: () => Int }) id: number,
    @Args('endDateTime', { type: () => String }) endDateTime: Date
  ) {
    return this.tripService.finalizeTrip(id, endDateTime);
  }
}
