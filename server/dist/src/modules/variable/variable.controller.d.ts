import { CreateVariableDto, UpdateVariableDto, VariableDto } from './variable.dto';
import { VariableService } from './variable.service';
export declare class VariableController {
    private readonly variableService;
    constructor(variableService: VariableService);
    createVariable(payload: CreateVariableDto): Promise<VariableDto>;
    getVariablesByEnvironmentId(environmentId: string): Promise<VariableDto[]>;
    updateVariable(variableId: string, payload: UpdateVariableDto): Promise<VariableDto>;
    deleteVariable(variableId: string): Promise<VariableDto>;
}
