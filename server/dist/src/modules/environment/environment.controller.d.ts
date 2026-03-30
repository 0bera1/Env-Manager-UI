import type { Response } from 'express';
import { CreateEnvironmentDto, CreateEnvironmentWithDotenvImportDto, CreateEnvironmentWithDotenvImportResultDto, EnvironmentDto, ImportEnvironmentDotenvDto, ImportEnvironmentDotenvResultDto } from './environment.dto';
import { EnvironmentService } from './environment.service';
export declare class EnvironmentController {
    private readonly environmentService;
    constructor(environmentService: EnvironmentService);
    getEnvironmentsByUserId(userId: string): Promise<EnvironmentDto[]>;
    exportEnvironmentDotenv(environmentId: string, res: Response): Promise<string>;
    createEnvironmentWithDotenvImport(payload: CreateEnvironmentWithDotenvImportDto): Promise<CreateEnvironmentWithDotenvImportResultDto>;
    importEnvironmentDotenv(environmentId: string, payload: ImportEnvironmentDotenvDto): Promise<ImportEnvironmentDotenvResultDto>;
    createEnvironment(payload: CreateEnvironmentDto): Promise<EnvironmentDto>;
    deleteEnvironment(environmentId: string): Promise<EnvironmentDto>;
}
