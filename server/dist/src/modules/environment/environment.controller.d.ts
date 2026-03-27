import { EnvironmentDto } from './environment.dto';
import { EnvironmentService } from './environment.service';
export declare class EnvironmentController {
    private readonly environmentService;
    constructor(environmentService: EnvironmentService);
    getEnvironmentsByProjectId(projectId: string): Promise<EnvironmentDto[]>;
}
