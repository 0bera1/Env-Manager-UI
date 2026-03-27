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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProjectRepository = class ProjectRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findAllByUserId(userId) {
        const projects = await this.prismaService.project.findMany({
            where: { userId },
            select: {
                id: true,
                name: true,
                userId: true,
            },
            orderBy: { name: 'asc' },
        });
        return projects;
    }
    async createProject(name, userId) {
        const createdProject = await this.prismaService.project.create({
            data: {
                name,
                userId,
            },
            select: {
                id: true,
                name: true,
                userId: true,
            },
        });
        return createdProject;
    }
};
exports.ProjectRepository = ProjectRepository;
exports.ProjectRepository = ProjectRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectRepository);
//# sourceMappingURL=project.repository.js.map