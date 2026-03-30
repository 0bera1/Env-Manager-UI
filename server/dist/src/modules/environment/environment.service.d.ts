import { CreateEnvironmentDto, CreateEnvironmentWithDotenvImportDto, CreateEnvironmentWithDotenvImportResultDto, EnvironmentDto, ImportEnvironmentDotenvDto, ImportEnvironmentDotenvResultDto } from './environment.dto';
import { EnvironmentRepository } from './environment.repository';
export declare class EnvironmentService {
    private readonly environmentRepository;
    constructor(environmentRepository: EnvironmentRepository);
    getEnvironmentsByUserId(userId: string): Promise<EnvironmentDto[]>;
    createEnvironment(payload: CreateEnvironmentDto): Promise<EnvironmentDto>;
    createEnvironmentWithDotenvImport(payload: CreateEnvironmentWithDotenvImportDto): Promise<CreateEnvironmentWithDotenvImportResultDto>;
    deleteEnvironment(environmentId: string): Promise<EnvironmentDto>;
    exportEnvironmentAsDotenv(environmentId: string): Promise<{
        dotenvContent: string;
        attachmentFileName: string;
    }>;
    importEnvironmentFromDotenv(environmentId: string, payload: ImportEnvironmentDotenvDto): Promise<ImportEnvironmentDotenvResultDto>;
    private parseDotenvImportContent;
    private dedupeDotenvEntriesLastWins;
    private parseImportedDotenvKey;
    private unescapeQuotedDotenvKey;
    private parseImportedDotenvValue;
    private parseImportedDoubleQuotedValue;
    private formatDotenvLine;
    private escapeDotenvKey;
    private escapeDotenvValue;
    private sanitizeDownloadBaseName;
    private buildDotenvAttachmentFileName;
}
