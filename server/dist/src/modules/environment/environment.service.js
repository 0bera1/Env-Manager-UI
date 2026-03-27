"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentService = void 0;
class EnvironmentService {
    environmentRepository;
    constructor(environmentRepository) {
        this.environmentRepository = environmentRepository;
    }
    async getEnvironmentsByProjectId(projectId) {
        return this.environmentRepository.findAllByProjectId(projectId);
    }
}
exports.EnvironmentService = EnvironmentService;
//# sourceMappingURL=environment.service.js.map