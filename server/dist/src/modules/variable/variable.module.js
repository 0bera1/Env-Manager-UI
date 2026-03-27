"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableModule = void 0;
const variable_controller_1 = require("./variable.controller");
const variable_repository_1 = require("./variable.repository");
const variable_service_1 = require("./variable.service");
class VariableModule {
    static createController() {
        const variableRepository = new variable_repository_1.VariableRepository();
        const variableService = new variable_service_1.VariableService(variableRepository);
        return new variable_controller_1.VariableController(variableService);
    }
}
exports.VariableModule = VariableModule;
//# sourceMappingURL=variable.module.js.map