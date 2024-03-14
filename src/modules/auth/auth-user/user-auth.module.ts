import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { SharedModule } from "src/modules/shared/shared.module";
import { UserModule } from "src/modules/user/user.module";
import { UserAuthService } from "./user-auth.service";
import { UserAuthResolver } from "./user-auth.resolver";
import { JwtUserStrategy } from "./user-jwt.strategy";


@Module({
    imports: [
      UserModule, 
      PassportModule,
      SharedModule 
    ],
    providers: [
      UserAuthService, 
      JwtUserStrategy,
      UserAuthResolver 
    ],
    exports: [UserAuthService], 
  })
  export class UserAuthModule {}