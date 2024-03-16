import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from 'src/modules/shared/shared.module';
import { AdminAuthService } from './admin-auth.service';
import { JwtAdminStrategy } from './admin-jwt.strategy';
import { AdminAuthResolver } from './admin-auth.resolver';
import { AdminModule } from 'src/modules/admin/admin.module';

@Module({
  imports: [AdminModule, PassportModule, SharedModule],
  providers: [AdminAuthService, JwtAdminStrategy, AdminAuthResolver],
  exports: [AdminAuthService],
})
export class AdminAuthModule {}
