import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/modules/shared/services/token.service';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class UserAuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user || !user.state) {
      throw new UnauthorizedException('User does not exist.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: hashedPassword, state, ...result } = user;
    return result;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }> {
    const user = await this.validateUser(email, password);
    const token = this.tokenService.generateToken(user);

    return {
      token,
      user,
    };
  }
}
