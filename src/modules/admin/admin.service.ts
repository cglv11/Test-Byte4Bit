import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async findAll(): Promise<{ admins: Admin[]; count: number }> {
    const [admins, count] = await this.adminRepository.findAndCount({
      where: { state: true },
    });
    return { admins, count };
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { id, state: true },
    });

    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    return admin;
  }

  async create(adminData: Partial<Admin>): Promise<Admin> {
    const existingAdmin = await this.adminRepository.findOne({
      where: { email: adminData.email, state: true },
    });

    if (existingAdmin) {
      throw new ConflictException('The email already exists.');
    }

    if (adminData.password) {
      const salt = await bcrypt.genSalt();
      adminData.password = await bcrypt.hash(adminData.password, salt);
    }

    const newAdmin = this.adminRepository.create(adminData);
    await this.adminRepository.save(newAdmin);
    return newAdmin;
  }

  async update(
    id: number,
    updateData: Partial<Admin>,
    requestTokenId: number,
  ): Promise<Admin> {
    if (id !== requestTokenId) {
      throw new UnauthorizedException(
        'You do not have permission to update this admin.',
      );
    }

    if (updateData.email) {
      const existingAdmin = await this.adminRepository.findOne({
        where: { email: updateData.email, state: true },
      });

      if (existingAdmin && existingAdmin.id !== id) {
        throw new ConflictException('The email already exists.');
      }
    }

    if (updateData.password) {
      const salt = await bcrypt.genSalt();
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    await this.adminRepository.update(id, updateData);
    return this.adminRepository.findOne({ where: { id, state: true } });
  }

  async remove(id: number, requestTokenId: number): Promise<void> {
    if (id !== requestTokenId) {
      throw new UnauthorizedException(
        'You do not have permission to delete this user.',
      );
    }

    await this.adminRepository.update(id, { state: false });
  }

  async findByEmail(email: string): Promise<Admin | undefined> {
    return this.adminRepository.findOne({ where: { email, state: true } });
  }

  async findOneBy(criteria: {
    id: number;
    state: boolean;
  }): Promise<Admin | undefined> {
    return this.adminRepository.findOneBy(criteria);
  }
}
