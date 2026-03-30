import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { VariableDto } from './variable.dto';
export declare class VariableRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAllByEnvironmentId(environmentId: string): Promise<VariableDto[]>;
    findEnvVariableById(variableId: string): Promise<VariableDto | null>;
    createEnvVariable(data: {
        key: string;
        value: string;
        isSecret: boolean;
        environmentId: string;
    }): Promise<VariableDto>;
    updateEnvVariableById(variableId: string, data: Prisma.EnvVariableUpdateInput): Promise<VariableDto>;
    deleteEnvVariableById(variableId: string): Promise<VariableDto>;
}
