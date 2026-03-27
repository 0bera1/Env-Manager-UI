"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentModule = void 0;
const environment_controller_1 = require("./environment.controller");
const environment_repository_1 = require("./environment.repository");
const environment_service_1 = require("./environment.service");
class EnvironmentModule {
    static createController() {
        const environmentRepository = new environment_repository_1.EnvironmentRepository();
        const environmentService = new environment_service_1.EnvironmentService(environmentRepository);
        return new environment_controller_1.EnvironmentController(environmentService);
    }
}
exports.EnvironmentModule = EnvironmentModule;
//# sourceMappingURL=environment.module.js.map