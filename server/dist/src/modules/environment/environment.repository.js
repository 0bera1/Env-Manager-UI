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
exports.EnvironmentRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let EnvironmentRepository = class EnvironmentRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findAllByUserId(userId) {
        const environments = await this.prismaService.environment.findMany({
            where: { userId },
            select: {
                id: true,
                name: true,
                userId: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return environments;
    }
    async createEnvironment(name, userId) {
        const createdEnvironment = await this.prismaService.environment.create({
            data: {
                name,
                userId,
            },
            select: {
                id: true,
                name: true,
                userId: true,
                createdAt: true,
            },
        });
        return createdEnvironment;
    }
    async createEnvironmentWithEnvVariables(name, userId, items) {
        return this.prismaService.$transaction(async (tx) => {
            const createdEnvironment = await tx.environment.create({
                data: {
                    name,
                    userId,
                },
                select: {
                    id: true,
                    name: true,
                    userId: true,
                    createdAt: true,
                },
            });
            if (items.length > 0) {
                await tx.envVariable.createMany({
                    data: items.map((row) => ({
                        key: row.key,
                        value: row.value,
                        environmentId: createdEnvironment.id,
                        isSecret: false,
                    })),
                });
            }
            return createdEnvironment;
        });
    }
    async findEnvironmentById(environmentId) {
        return this.prismaService.environment.findUnique({
            where: { id: environmentId },
            select: {
                id: true,
                name: true,
                userId: true,
                createdAt: true,
            },
        });
    }
    async findEnvVariablesKeyValueByEnvironmentId(environmentId) {
        return this.prismaService.envVariable.findMany({
            where: { environmentId },
            select: {
                key: true,
                value: true,
            },
            orderBy: { key: 'asc' },
        });
    }
    async findEnvVariableByKeyAndEnvironmentId(environmentId, key) {
        return this.prismaService.envVariable.findUnique({
            where: {
                key_environmentId: {
                    key,
                    environmentId,
                },
            },
            select: { id: true },
        });
    }
    async upsertEnvVariableByKeyAndEnvironmentId(environmentId, key, value) {
        await this.prismaService.envVariable.upsert({
            where: {
                key_environmentId: {
                    key,
                    environmentId,
                },
            },
            create: {
                key,
                value,
                environmentId,
                isSecret: false,
            },
            update: {
                value,
            },
        });
    }
    async replaceAllEnvVariablesForEnvironment(environmentId, items) {
        return this.prismaService.$transaction(async (tx) => {
            const deleted = await tx.envVariable.deleteMany({
                where: { environmentId },
            });
            if (items.length === 0) {
                return { removed: deleted.count, created: 0 };
            }
            const created = await tx.envVariable.createMany({
                data: items.map((row) => ({
                    key: row.key,
                    value: row.value,
                    environmentId,
                    isSecret: false,
                })),
            });
            return { removed: deleted.count, created: created.count };
        });
    }
    async deleteEnvironmentById(environmentId) {
        const deletedEnvironment = await this.prismaService.environment.delete({
            where: { id: environmentId },
            select: {
                id: true,
                name: true,
                userId: true,
                createdAt: true,
            },
        });
        return deletedEnvironment;
    }
};
exports.EnvironmentRepository = EnvironmentRepository;
exports.EnvironmentRepository = EnvironmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EnvironmentRepository);
//# sourceMappingURL=environment.repository.js.map