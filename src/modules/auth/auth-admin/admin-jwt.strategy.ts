import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminService } from 'src/modules/admin/admin.service';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(private adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRETORPRIVATEKEY,
    });
  }

  async validate(payload: any) {
    const admin = await this.adminService.findOne(payload.sub);
    if (!admin) {
      throw new UnauthorizedException('Access denied. Admin not found.');
    }

    return admin;
  }
}
