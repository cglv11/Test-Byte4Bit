import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { SharedModule } from "src/modules/shared/shared.module";
import { UserModule } from "src/modules/user/user.module";
import { UserAuthService } from "./user-auth.service";
import { JwtStrategy } from "../jwt.strategy";
import { UserAuthResolver } from "./user-auth.resolver";


@Module({
    imports: [
      UserModule, 
      PassportModule,
      SharedModule 
    ],
    providers: [
      UserAuthService, 
      JwtStrategy,
      UserAuthResolver 
    ],
    exports: [UserAuthService], 
  })
  export class UserAuthModule {}