import { VariableDto } from './variable.dto';
export declare class VariableRepository {
    findAllByEnvironmentId(environmentId: string): Promise<VariableDto[]>;
}
