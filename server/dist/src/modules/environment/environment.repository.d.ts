import { EnvironmentDto } from './environment.dto';
export declare class EnvironmentRepository {
    findAllByProjectId(projectId: string): Promise<EnvironmentDto[]>;
}
