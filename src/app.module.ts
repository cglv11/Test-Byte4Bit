import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { Driver } from './modules/driver/driver.entity';
import { Trip } from './modules/trip/trip.entity';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { Request } from 'express';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gpl',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'db_transport_app',
      entities: [User, Driver, Trip],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    SharedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
