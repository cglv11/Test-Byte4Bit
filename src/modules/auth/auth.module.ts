import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from '../shared/shared.module';
import { UserAuthModule } from './auth-user/user-auth.module';
import { DriverAuthModule } from './auth-driver/driver-auth.module';

@Module({
  imports: [
    UserAuthModule,
    DriverAuthModule,
    PassportModule,
    SharedModule
  ],
  exports: [],
})

export class AuthModule {}
