import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { DriverModule } from './modules/driver/driver.module';
import { TripModule } from './modules/trip/trip.module';
import { AdminModule } from './modules/admin/admin.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gpl',
      path: 'transport-app',
    }),
    DatabaseModule,
    AdminModule,
    AuthModule,
    UserModule,
    DriverModule,
    TripModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
