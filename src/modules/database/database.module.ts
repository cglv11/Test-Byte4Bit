import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Trip } from '../trip/trip.entity';
import { Driver } from '../driver/driver.entity';
import { Admin } from '../admin/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: 5432,
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || '123456',
      database: process.env.DATABASE_DATABASE || 'db_transport_app',
      entities: [User, Driver, Trip, Admin],
      // synchronize: true, // Only for development
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}
