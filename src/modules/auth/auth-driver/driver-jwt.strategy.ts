import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DriverService } from '../../driver/driver.service';
import { AdminService } from 'src/modules/admin/admin.service';

@Injectable()
export class JwtDriverStrategy extends PassportStrategy(
  Strategy,
  'jwt-driver',
) {
  constructor(
    private driverService: DriverService,
    private adminService: AdminService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRETORPRIVATEKEY,
    });
  }

  async validate(payload: any) {
    if (payload.role === 'admin') {
      const admin = await this.adminService.findOne(payload.sub);
      if (!admin) {
        throw new UnauthorizedException('Access denied. Admin not found.');
      }
      return admin;
    }

    if (payload.role === 'driver') {
      const driver = await this.driverService.findOne(payload.sub);
      if (!driver) {
        throw new UnauthorizedException('Access denied. Driver not found.');
      }
      return driver;
    }

    throw new UnauthorizedException('Access denied. Invalid token.');
  }
}
