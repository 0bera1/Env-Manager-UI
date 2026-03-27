import { CreateProjectDto, ProjectDto } from './project.dto';
import { ProjectService } from './project.service';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    getProjectsByUserId(userId: string): Promise<ProjectDto[]>;
    createProject(payload: CreateProjectDto): Promise<ProjectDto>;
}
