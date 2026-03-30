export declare class CreateVariableDto {
    key: string;
    value: string;
    isSecret?: boolean;
    environmentId: string;
}
export declare class UpdateVariableDto {
    key?: string;
    value?: string;
    isSecret?: boolean;
}
export declare class VariableDto {
    id: string;
    key: string;
    value: string;
    isSecret: boolean;
    environmentId: string;
    createdAt: Date;
}
