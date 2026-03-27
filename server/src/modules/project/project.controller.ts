import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProjectDto, ProjectDto } from './project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ProjectController {
  public constructor(private readonly projectService: ProjectService) {}

  @Get('user/:userId')
  public async getProjectsByUserId(
    @Param('userId') userId: string,
  ): Promise<ProjectDto[]> {
    return this.projectService.getProjectsByUserId(userId);
  }

  @Post()
  public async createProject(@Body() payload: CreateProjectDto): Promise<ProjectDto> {
    return this.projectService.createProject(payload);
  }
}
