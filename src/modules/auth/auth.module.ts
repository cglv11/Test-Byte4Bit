import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from '../shared/shared.module';
import { UserAuthModule } from './auth-user/user-auth.module';

@Module({
  imports: [
    UserAuthModule,
    PassportModule,
    SharedModule
  ],
  exports: [],
})

export class AuthModule {}
