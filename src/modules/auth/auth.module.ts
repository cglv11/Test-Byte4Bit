import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from '../shared/shared.module';
import { UserAuthModule } from './auth-user/user-auth.module';
import { DriverAuthModule } from './auth-driver/driver-auth.module';
import { AdminAuthModule } from './auth-admin/admin-auth.module';
import { TripAuthModule } from './auth-trip/trip-auth.module';

@Module({
  imports: [
    AdminAuthModule,
    UserAuthModule,
    DriverAuthModule,
    TripAuthModule,
    PassportModule,
    SharedModule,
  ],
  exports: [],
})
export class AuthModule {}
