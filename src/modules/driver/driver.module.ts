import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { SharedModule } from '../shared/shared.module';
import { DriverService } from './driver.service';
import { DriverResolver } from './driver.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Driver]), SharedModule],
  providers: [DriverResolver, DriverService],
  exports: [DriverService],
})
export class DriverModule {}
