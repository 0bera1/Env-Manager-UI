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
exports.VariableRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const variableSelect = {
    id: true,
    key: true,
    value: true,
    isSecret: true,
    environmentId: true,
    createdAt: true,
};
let VariableRepository = class VariableRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findAllByEnvironmentId(environmentId) {
        return this.prismaService.envVariable.findMany({
            where: { environmentId },
            select: { ...variableSelect },
            orderBy: { key: 'asc' },
        });
    }
    async findEnvVariableById(variableId) {
        return this.prismaService.envVariable.findUnique({
            where: { id: variableId },
            select: { ...variableSelect },
        });
    }
    async createEnvVariable(data) {
        return this.prismaService.envVariable.create({
            data: {
                key: data.key,
                value: data.value,
                isSecret: data.isSecret,
                environmentId: data.environmentId,
            },
            select: { ...variableSelect },
        });
    }
    async updateEnvVariableById(variableId, data) {
        return this.prismaService.envVariable.update({
            where: { id: variableId },
            data,
            select: { ...variableSelect },
        });
    }
    async deleteEnvVariableById(variableId) {
        return this.prismaService.envVariable.delete({
            where: { id: variableId },
            select: { ...variableSelect },
        });
    }
};
exports.VariableRepository = VariableRepository;
exports.VariableRepository = VariableRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VariableRepository);
//# sourceMappingURL=variable.repository.js.map