import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TripService } from './trip.service';
import { Trip } from './trip.entity';
import { CreateTripInput } from './dto/create-trip.input';
import { UpdateTripInput } from './dto/update-trip.input';
import { TripResponse } from './dto/trip.response';

@Resolver(() => Trip)
export class TripResolver {
  constructor(private readonly tripService: TripService) {}

  @Query(() => TripResponse, { name: 'trips' })
  async trips() {
    const result = await this.tripService.findAll();
    return result;
  }

  @Query(() => Trip, { nullable: true })
  async trip(@Args('id', { type: () => Int }) id: number) {
    return this.tripService.findOne(id);
  }

  @Mutation(() => Trip)
  async createTrip(@Args('createTripData') createTripData: CreateTripInput) {
    return this.tripService.create(createTripData);
  }

  @Mutation(() => Trip)
  async updateTrip(
    @Args('updateTripData') updateTripData: UpdateTripInput,
  ) {
    return this.tripService.update(updateTripData.id, updateTripData);
  }

  @Mutation(() => Boolean)
  async removeTrip(@Args('id', { type: () => Int }) id: number) {
    await this.tripService.remove(id);
    return true;
  }

  @Mutation(returns => Trip)
  async finalizeTrip(
    @Args('id', { type: () => Int }) id: number,
    @Args('endDateTime', { type: () => String }) endDateTime: Date
  ) {
    return this.tripService.finalizeTrip(id, endDateTime);
  }
}
