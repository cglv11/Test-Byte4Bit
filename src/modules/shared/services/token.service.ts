import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/user.entity';
import { Driver } from '../../driver/driver.entity';
import { Admin } from '../../admin/admin.entity';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: User) {
    const payload = { email: user.email, sub: user.id, role: 'user' };
    return this.jwtService.sign(payload);
  }

  generateTokenDriver(driver: Driver) {
    const payload = { email: driver.email, sub: driver.id, role: 'driver' };
    return this.jwtService.sign(payload);
  }

  generateTokenAdmin(admin: Admin) {
    const payload = { email: admin.email, sub: admin.id, role: 'admin' };
    return this.jwtService.sign(payload);
  }
}
