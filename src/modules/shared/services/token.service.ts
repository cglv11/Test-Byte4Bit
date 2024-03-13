import { Injectable } from "@nestjs/common";
import { User } from "../../user/user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

}