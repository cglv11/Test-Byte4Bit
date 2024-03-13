import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    SharedModule
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService],
})

export class AuthModule {}
