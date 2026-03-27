"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentController = void 0;
class EnvironmentController {
    environmentService;
    constructor(environmentService) {
        this.environmentService = environmentService;
    }
    async getEnvironmentsByProjectId(projectId) {
        return this.environmentService.getEnvironmentsByProjectId(projectId);
    }
}
exports.EnvironmentController = EnvironmentController;
//# sourceMappingURL=environment.controller.js.map