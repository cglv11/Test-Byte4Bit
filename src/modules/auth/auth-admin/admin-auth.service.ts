import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AdminService } from 'src/modules/admin/admin.service';
import { TokenService } from 'src/modules/shared/services/token.service';
import { Admin } from '../../admin/admin.entity';

@Injectable()
export class AdminAuthService {
  constructor(
    private adminService: AdminService,
    private tokenService: TokenService,
  ) {}

  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminService.findByEmail(email);

    if (!admin || !admin.state) {
      throw new UnauthorizedException('Admin does not exist.');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: hashedPassword, state, ...result } = admin;
    return result;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; admin: Admin }> {
    const admin = await this.validateAdmin(email, password);
    const token = this.tokenService.generateTokenAdmin(admin);

    return {
      token,
      admin,
    };
  }
}
