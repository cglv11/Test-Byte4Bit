import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip, TripStatus } from './trip.entity';
import { UserService } from '../user/user.service';
import { DriverService } from '../driver/driver.service';
import { CreateTripInput } from './dto/create-trip.input';
import { UpdateTripInput } from './dto/update-trip.input';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip) private readonly tripRepository: Repository<Trip>,
    private readonly userService: UserService, 
    private readonly driverService: DriverService 
  ) {}
    
  async findAll(): Promise<Trip[]> {
    return this.tripRepository.find();
  }

  async findOne(id: number): Promise<Trip> {
    return this.tripRepository.findOne({ where: { id } });
  }

  async create(createTripData: CreateTripInput): Promise<Trip>  {
    const userExists = await this.userService.findOne(createTripData.userId);
    if (!userExists) {
      throw new NotFoundException(`User with ID ${createTripData.userId} not found`);
    }

    const driverExists = await this.driverService.findOne(createTripData.driverId);
    if (!driverExists) {
      throw new NotFoundException(`Driver with ID ${createTripData.driverId} not found`);
    }

    const trip = this.tripRepository.create({
        ...createTripData,
        user: userExists,
        driver: driverExists
      });

    await this.tripRepository.save(trip);
    return this.tripRepository.findOne({ where: { id: trip.id }, relations: ['driver', 'user'] });
  }

  async update(id: number, updateTripData: UpdateTripInput): Promise<Trip> {
    const trip = await this.tripRepository.findOne({ where: { id } });
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
  
    const userExists = await this.userService.findOne(updateTripData.userId);
    if (!userExists) {
      throw new NotFoundException(`User with ID ${updateTripData.userId} not found`);
    }

    const driverExists = await this.driverService.findOne(updateTripData.driverId);
    if (!driverExists) {
      throw new NotFoundException(`Driver with ID ${updateTripData.driverId} not found`);
    }

    const tripUpdated = this.tripRepository.create({
        ...updateTripData,
        user: userExists,
        driver: driverExists
      });

    await this.tripRepository.update(id, tripUpdated);

    return this.tripRepository.findOne({ where: { id }, relations: ['driver', 'user'] });
  }

  async delete(id: number): Promise<void> {
    await this.tripRepository.delete(id);
  }

  async finalizeTrip(id: number, endDateTime: Date): Promise<Trip> {
    const trip = await this.tripRepository.findOne({ where: { id } });
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
  
    if (endDateTime <= trip.startDateTime) {
      throw new BadRequestException('End date must be after the start date.');
    }
  
    trip.endDateTime = endDateTime;
    trip.status = TripStatus.COMPLETED;
  
    const durationInMilliseconds = endDateTime.getTime() - trip.startDateTime.getTime();
    const durationInMinutes = Math.round(durationInMilliseconds / 60000);
  
    trip.duration = durationInMinutes;
    
    await this.tripRepository.save(trip);
    return trip;
  }
}
