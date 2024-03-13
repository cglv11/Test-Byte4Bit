import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { TokenService } from '../shared/services/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService
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

    const { password: hashedPassword, state, ...result } = user;
    return result;
  }

  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const user = await this.validateUser(email, password);
    const token = this.tokenService.generateToken(user);

    return {
      token,
      user,
    };
  }
  
}
