import { Injectable } from '@nestjs/common';
import { CreateProjectDto, ProjectDto } from './project.dto';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  public constructor(private readonly projectRepository: ProjectRepository) {}

  public async getProjectsByUserId(userId: string): Promise<ProjectDto[]> {
    return this.projectRepository.findAllByUserId(userId);
  }

  public async createProject(payload: CreateProjectDto): Promise<ProjectDto> {
    return this.projectRepository.createProject(payload.name, payload.userId);
  }
}
