import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DriverService } from 'src/modules/driver/driver.service';
import { TokenService } from 'src/modules/shared/services/token.service';
import { Driver } from '../../driver/driver.entity';

@Injectable()
export class DriverAuthService {
  constructor(
    private driverService: DriverService,
    private tokenService: TokenService,
  ) {}

  async validateDriver(email: string, password: string): Promise<any> {
    const driver = await this.driverService.findByEmail(email);

    if (!driver || !driver.state) {
      throw new UnauthorizedException('Driver does not exist.');
    }

    const isPasswordValid = await bcrypt.compare(password, driver.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: hashedPassword, state, ...result } = driver;
    return result;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; driver: Driver }> {
    const driver = await this.validateDriver(email, password);
    const token = this.tokenService.generateTokenDriver(driver);

    return {
      token,
      driver,
    };
  }
}
