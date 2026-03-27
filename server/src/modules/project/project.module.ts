import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './project.repository';
import { ProjectService } from './project.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  exports: [ProjectService],
})
export class ProjectModule {}
