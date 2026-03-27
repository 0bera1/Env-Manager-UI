import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectDto } from './project.dto';

@Injectable()
export class ProjectRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findAllByUserId(userId: string): Promise<ProjectDto[]> {
    const projects: Project[] = await this.prismaService.project.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        userId: true,
      },
      orderBy: { name: 'asc' },
    });

    return projects;
  }

  public async createProject(name: string, userId: string): Promise<ProjectDto> {
    const createdProject: Project = await this.prismaService.project.create({
      data: {
        name,
        userId,
      },
      select: {
        id: true,
        name: true,
        userId: true,
      },
    });

    return createdProject;
  }
}
