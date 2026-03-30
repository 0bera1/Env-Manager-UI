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
exports.VariableService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const variable_repository_1 = require("./variable.repository");
let VariableService = class VariableService {
    variableRepository;
    constructor(variableRepository) {
        this.variableRepository = variableRepository;
    }
    async createVariable(payload) {
        const isSecret = payload.isSecret ?? false;
        try {
            return await this.variableRepository.createEnvVariable({
                key: payload.key.trim(),
                value: payload.value,
                isSecret,
                environmentId: payload.environmentId,
            });
        }
        catch (error) {
            this.rethrowPrismaVariableError(error);
        }
    }
    async getVariablesByEnvironmentId(environmentId) {
        return this.variableRepository.findAllByEnvironmentId(environmentId);
    }
    async updateVariable(variableId, payload) {
        const hasKey = payload.key !== undefined;
        const hasValue = payload.value !== undefined;
        const hasSecret = payload.isSecret !== undefined;
        if (!hasKey && !hasValue && !hasSecret) {
            throw new common_1.BadRequestException('Guncelleme icin en az bir alan (key, value, isSecret) gonderilmelidir.');
        }
        const existing = await this.variableRepository.findEnvVariableById(variableId);
        if (existing === null) {
            throw new common_1.NotFoundException('Variable bulunamadi.');
        }
        const data = {};
        if (hasKey && payload.key !== undefined) {
            data.key = payload.key.trim();
        }
        if (hasValue && payload.value !== undefined) {
            data.value = payload.value;
        }
        if (hasSecret && payload.isSecret !== undefined) {
            data.isSecret = payload.isSecret;
        }
        try {
            return await this.variableRepository.updateEnvVariableById(variableId, data);
        }
        catch (error) {
            this.rethrowPrismaVariableError(error);
        }
    }
    async deleteVariable(variableId) {
        const existing = await this.variableRepository.findEnvVariableById(variableId);
        if (existing === null) {
            throw new common_1.NotFoundException('Variable bulunamadi.');
        }
        return this.variableRepository.deleteEnvVariableById(variableId);
    }
    rethrowPrismaVariableError(error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case 'P2002':
                    throw new common_1.ConflictException('Bu environment icinde bu anahtar zaten kullaniliyor.');
                case 'P2003':
                    throw new common_1.BadRequestException('Gecersiz environment kimligi veya bagimlilik hatasi.');
                case 'P2025':
                    throw new common_1.NotFoundException('Variable bulunamadi.');
                default:
                    break;
            }
        }
        throw error;
    }
};
exports.VariableService = VariableService;
exports.VariableService = VariableService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [variable_repository_1.VariableRepository])
], VariableService);
//# sourceMappingURL=variable.service.js.map