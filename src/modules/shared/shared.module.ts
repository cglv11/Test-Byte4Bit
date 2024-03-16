import { Module } from '@nestjs/common';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRETORPRIVATEKEY,
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class SharedModule {}
