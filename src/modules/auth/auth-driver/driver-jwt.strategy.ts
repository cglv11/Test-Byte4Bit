import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DriverService } from '../../driver/driver.service';

@Injectable()
export class JwtDriverStrategy extends PassportStrategy(Strategy, 'jwt-driver') {
  constructor(private driverService: DriverService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRETORPRIVATEKEY,
    });
  }

  async validate(payload: any) {
    const driver = await this.driverService.findOne(payload.sub);
    if (!driver) {
      throw new UnauthorizedException('Access denied. Driver not found.');
    }

    return driver;
  }
}
