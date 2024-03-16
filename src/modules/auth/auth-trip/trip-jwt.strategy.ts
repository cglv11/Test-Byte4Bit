import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminService } from 'src/modules/admin/admin.service';
import { DriverService } from 'src/modules/driver/driver.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtTripStrategy extends PassportStrategy(Strategy, 'jwt-trip') {
  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private driverService: DriverService,
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

    if (payload.role === 'user') {
      const user = await this.userService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Access denied. User not found.');
      }
      return user;
    }

    throw new UnauthorizedException('Access denied. Invalid token.');
  }
}
