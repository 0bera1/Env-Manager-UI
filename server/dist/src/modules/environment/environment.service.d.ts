import { EnvironmentDto } from './environment.dto';
import { EnvironmentRepository } from './environment.repository';
export declare class EnvironmentService {
    private readonly environmentRepository;
    constructor(environmentRepository: EnvironmentRepository);
    getEnvironmentsByProjectId(projectId: string): Promise<EnvironmentDto[]>;
}
