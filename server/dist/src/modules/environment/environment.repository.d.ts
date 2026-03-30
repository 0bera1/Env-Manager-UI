import { Environment } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { EnvironmentDto } from './environment.dto';
export declare class EnvironmentRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAllByUserId(userId: string): Promise<EnvironmentDto[]>;
    createEnvironment(name: string, userId: string): Promise<EnvironmentDto>;
    createEnvironmentWithEnvVariables(name: string, userId: string, items: {
        key: string;
        value: string;
    }[]): Promise<EnvironmentDto>;
    findEnvironmentById(environmentId: string): Promise<Environment | null>;
    findEnvVariablesKeyValueByEnvironmentId(environmentId: string): Promise<{
        key: string;
        value: string;
    }[]>;
    findEnvVariableByKeyAndEnvironmentId(environmentId: string, key: string): Promise<{
        id: string;
    } | null>;
    upsertEnvVariableByKeyAndEnvironmentId(environmentId: string, key: string, value: string): Promise<void>;
    replaceAllEnvVariablesForEnvironment(environmentId: string, items: {
        key: string;
        value: string;
    }[]): Promise<{
        removed: number;
        created: number;
    }>;
    deleteEnvironmentById(environmentId: string): Promise<EnvironmentDto>;
}
