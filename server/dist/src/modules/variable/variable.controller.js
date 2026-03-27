"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableController = void 0;
class VariableController {
    variableService;
    constructor(variableService) {
        this.variableService = variableService;
    }
    async getVariablesByEnvironmentId(environmentId) {
        return this.variableService.getVariablesByEnvironmentId(environmentId);
    }
}
exports.VariableController = VariableController;
//# sourceMappingURL=variable.controller.js.map