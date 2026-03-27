import { CreateProjectDto, ProjectDto } from './project.dto';
import { ProjectRepository } from './project.repository';
export declare class ProjectService {
    private readonly projectRepository;
    constructor(projectRepository: ProjectRepository);
    getProjectsByUserId(userId: string): Promise<ProjectDto[]>;
    createProject(payload: CreateProjectDto): Promise<ProjectDto>;
}
