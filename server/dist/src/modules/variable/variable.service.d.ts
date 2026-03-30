import { CreateVariableDto, UpdateVariableDto, VariableDto } from './variable.dto';
import { VariableRepository } from './variable.repository';
export declare class VariableService {
    private readonly variableRepository;
    constructor(variableRepository: VariableRepository);
    createVariable(payload: CreateVariableDto): Promise<VariableDto>;
    getVariablesByEnvironmentId(environmentId: string): Promise<VariableDto[]>;
    updateVariable(variableId: string, payload: UpdateVariableDto): Promise<VariableDto>;
    deleteVariable(variableId: string): Promise<VariableDto>;
    private rethrowPrismaVariableError;
}
