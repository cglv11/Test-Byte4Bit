import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Driver } from './driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}


  async findAll(): Promise<Driver[]> {
    return this.driverRepository.find({
      where: { state: true },
      relations: ['trips'],
    });
  }


  async findOne(id: number): Promise<Driver | undefined> {
    return this.driverRepository.findOne({
      where: { id, state: true },
      relations: ['trips'],
    });
  }


  async create(driverData: Partial<Driver>): Promise<Driver> {
    const existingDriver = await this.driverRepository.findOne({ 
      where: { email: driverData.email, state: true  } 
    });
  
    if (existingDriver) {
      throw new ConflictException('The email already exists.');
    }

    if (driverData.password) {
      const salt = await bcrypt.genSalt();
      driverData.password = await bcrypt.hash(driverData.password, salt);
    }
  
    const newDriver = this.driverRepository.create(driverData);
    await this.driverRepository.save(newDriver);
    return newDriver;
  }


  async update(id: number, updateData: Partial<Driver>, requestTokenId: number): Promise<Driver> {

    if (id !== requestTokenId) {
      throw new UnauthorizedException('You do not have permission to update this driver.');
    }

    if (updateData.email) {
      const existingDriver = await this.driverRepository.findOne({
        where: { email: updateData.email, state: true  },
      });
  
      if (existingDriver && existingDriver.id !== id) {
        throw new ConflictException('The email already exists.');
      }
    }

    if (updateData.password) {
      const salt = await bcrypt.genSalt();
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
  
    await this.driverRepository.update(id, updateData);
    return this.driverRepository.findOne({ where: { id, state: true }, relations: ['trips'] });
  }


  async remove(id: number, requestTokenId: number): Promise<void> {

    if (id !== requestTokenId) {
      throw new UnauthorizedException('You do not have permission to delete this driver.');
    }
    
    await this.driverRepository.update(id, { state: false });
  }

  
  async findByEmail(email: string): Promise<Driver | undefined> {
    return this.driverRepository.findOne({ where: { email, state: true  } });
  }
}
