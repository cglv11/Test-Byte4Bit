import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { Admin } from './admin.entity';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), SharedModule],
  providers: [AdminResolver, AdminService],
  exports: [AdminService],
})
export class AdminModule {}
