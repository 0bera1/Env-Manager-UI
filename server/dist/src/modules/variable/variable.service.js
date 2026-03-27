"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableService = void 0;
class VariableService {
    variableRepository;
    constructor(variableRepository) {
        this.variableRepository = variableRepository;
    }
    async getVariablesByEnvironmentId(environmentId) {
        return this.variableRepository.findAllByEnvironmentId(environmentId);
    }
}
exports.VariableService = VariableService;
//# sourceMappingURL=variable.service.js.map