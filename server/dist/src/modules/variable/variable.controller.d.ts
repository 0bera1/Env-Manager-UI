import { VariableDto } from './variable.dto';
import { VariableService } from './variable.service';
export declare class VariableController {
    private readonly variableService;
    constructor(variableService: VariableService);
    getVariablesByEnvironmentId(environmentId: string): Promise<VariableDto[]>;
}
