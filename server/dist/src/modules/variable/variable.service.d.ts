import { VariableDto } from './variable.dto';
import { VariableRepository } from './variable.repository';
export declare class VariableService {
    private readonly variableRepository;
    constructor(variableRepository: VariableRepository);
    getVariablesByEnvironmentId(environmentId: string): Promise<VariableDto[]>;
}
