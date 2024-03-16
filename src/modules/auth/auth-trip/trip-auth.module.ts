import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { AdminModule } from 'src/modules/admin/admin.module';
import { DriverModule } from 'src/modules/driver/driver.module';
import { SharedModule } from 'src/modules/shared/shared.module';
import { UserModule } from 'src/modules/user/user.module';
import { JwtTripStrategy } from './trip-jwt.strategy';

@Module({
  imports: [
    AdminModule,
    DriverModule,
    UserModule,
    PassportModule,
    SharedModule,
  ],
  providers: [JwtTripStrategy],
  exports: [],
})
export class TripAuthModule {}
