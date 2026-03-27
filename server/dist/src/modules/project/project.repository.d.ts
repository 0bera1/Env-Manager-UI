import { PrismaService } from '../../prisma/prisma.service';
import { ProjectDto } from './project.dto';
export declare class ProjectRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAllByUserId(userId: string): Promise<ProjectDto[]>;
    createProject(name: string, userId: string): Promise<ProjectDto>;
}
