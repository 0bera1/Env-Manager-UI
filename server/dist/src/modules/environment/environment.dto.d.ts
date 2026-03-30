export declare class CreateEnvironmentDto {
    name: string;
    userId: string;
}
export declare class EnvironmentDto {
    id: string;
    name: string;
    userId: string;
    createdAt: Date;
}
export declare class CreateEnvironmentWithDotenvImportDto {
    name: string;
    userId: string;
    content: string;
}
export declare class ImportEnvironmentDotenvDto {
    content: string;
    replaceAll?: boolean;
}
export declare class ImportEnvironmentDotenvResultDto {
    created: number;
    updated: number;
    removed: number;
    importedKeys: number;
    skippedLines: number;
}
export declare class CreateEnvironmentWithDotenvImportResultDto {
    environment: EnvironmentDto;
    import: ImportEnvironmentDotenvResultDto;
}
