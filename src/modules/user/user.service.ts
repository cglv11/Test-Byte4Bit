import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}


  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: { state: true },
      relations: ['trips']
    });
  }


  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id, state: true },
      relations: ['trips']
    });
  }


  async create(userData: Partial<User>): Promise<User> {
    const existingUser = await this.userRepository.findOne({ 
      where: { email: userData.email, state: true  } 
    });
  
    if (existingUser) {
      throw new ConflictException('The email already exists.');
    }

    if (userData.password) {
      const salt = await bcrypt.genSalt();
      userData.password = await bcrypt.hash(userData.password, salt);
    }
  
    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }


  async update(id: number, updateData: Partial<User>, requestTokenId: number): Promise<User> {

    if (id !== requestTokenId) {
      throw new UnauthorizedException('You do not have permission to update this user.');
    }

    if (updateData.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateData.email, state: true  },
      });
  
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('The email already exists.');
      }
    }

    if (updateData.password) {
      const salt = await bcrypt.genSalt();
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
  
    await this.userRepository.update(id, updateData);
    return this.userRepository.findOne({ where: { id, state: true }, relations: ['trips'] },);
  }


  async remove(id: number, requestTokenId: number): Promise<void> {

    if (id !== requestTokenId) {
      throw new UnauthorizedException('You do not have permission to delete this user.');
    }
    
    await this.userRepository.update(id, { state: false });
  }

  
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email, state: true  } });
  }
}
