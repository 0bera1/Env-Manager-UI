"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const project_dto_1 = require("./project.dto");
const project_service_1 = require("./project.service");
let ProjectController = class ProjectController {
    projectService;
    constructor(projectService) {
        this.projectService = projectService;
    }
    async getProjectsByUserId(userId) {
        return this.projectService.getProjectsByUserId(userId);
    }
    async createProject(payload) {
        return this.projectService.createProject(payload);
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Kullaniciya ait projeleri listeler',
        description: 'Siralama: proje adi (A-Z).',
    }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        description: 'Kullanici (User) UUID',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Proje listesi',
        type: project_dto_1.ProjectDto,
        isArray: true,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Gecersiz veya eksik parametre' }),
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectsByUserId", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Yeni proje olusturur',
        description: '`userId` veritabaninda mevcut bir kullaniciya ait olmalidir (FK).',
    }),
    (0, swagger_1.ApiBody)({ type: project_dto_1.CreateProjectDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Proje olusturuldu',
        type: project_dto_1.ProjectDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Dogrulama hatasi' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "createProject", null);
exports.ProjectController = ProjectController = __decorate([
    (0, swagger_1.ApiTags)('Projects'),
    (0, common_1.Controller)('projects'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map