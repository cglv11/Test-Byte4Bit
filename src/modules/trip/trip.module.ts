import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trip.entity';
import { UserModule } from '../user/user.module';
import { DriverModule } from '../driver/driver.module';
import { TripService } from './trip.service';
import { TripResolver } from './trip.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Trip]), UserModule, DriverModule],
  providers: [TripService, TripResolver],
  exports: [TripService],
})
export class TripModule {}
