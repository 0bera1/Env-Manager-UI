import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { EnvironmentController } from './environment.controller';
import { EnvironmentRepository } from './environment.repository';
import { EnvironmentService } from './environment.service';

@Module({
  imports: [PrismaModule],
  controllers: [EnvironmentController],
  providers: [EnvironmentService, EnvironmentRepository],
  exports: [EnvironmentService],
})
export class EnvironmentModule {
}
