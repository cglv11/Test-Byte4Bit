import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from 'src/modules/shared/shared.module';
import { DriverModule } from 'src/modules/driver/driver.module';
import { DriverAuthService } from './driver-auth.service';
import { DriverAuthResolver } from './driver-auth.resolver';
import { JwtDriverStrategy } from './driver-jwt.strategy';
import { AdminModule } from 'src/modules/admin/admin.module';

@Module({
  imports: [AdminModule, DriverModule, PassportModule, SharedModule],
  providers: [DriverAuthService, JwtDriverStrategy, DriverAuthResolver],
  exports: [DriverAuthService],
})
export class DriverAuthModule {}
