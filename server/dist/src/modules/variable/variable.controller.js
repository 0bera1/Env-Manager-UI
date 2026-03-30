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
exports.VariableController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const variable_dto_1 = require("./variable.dto");
const variable_service_1 = require("./variable.service");
let VariableController = class VariableController {
    variableService;
    constructor(variableService) {
        this.variableService = variableService;
    }
    async createVariable(payload) {
        return this.variableService.createVariable(payload);
    }
    async getVariablesByEnvironmentId(environmentId) {
        return this.variableService.getVariablesByEnvironmentId(environmentId);
    }
    async updateVariable(variableId, payload) {
        return this.variableService.updateVariable(variableId, payload);
    }
    async deleteVariable(variableId) {
        return this.variableService.deleteVariable(variableId);
    }
};
exports.VariableController = VariableController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Yeni environment degiskeni olusturur' }),
    (0, swagger_1.ApiBody)({ type: variable_dto_1.CreateVariableDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Variable olusturuldu',
        type: variable_dto_1.VariableDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Dogrulama veya gecersiz environment' }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'Ayni environment icinde key tekrari',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [variable_dto_1.CreateVariableDto]),
    __metadata("design:returntype", Promise)
], VariableController.prototype, "createVariable", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Bir environmenta ait degiskenleri listeler',
        description: 'Siralama: anahtar (A-Z).',
    }),
    (0, swagger_1.ApiParam)({
        name: 'environmentId',
        description: 'Environment UUID',
        example: '550e8400-e29b-41d4-a716-446655440002',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Variable listesi',
        type: variable_dto_1.VariableDto,
        isArray: true,
    }),
    (0, common_1.Get)('environment/:environmentId'),
    __param(0, (0, common_1.Param)('environmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VariableController.prototype, "getVariablesByEnvironmentId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Variable gunceller (kismi alanlar)' }),
    (0, swagger_1.ApiParam)({
        name: 'variableId',
        description: 'Variable UUID',
        example: '550e8400-e29b-41d4-a716-446655440003',
    }),
    (0, swagger_1.ApiBody)({ type: variable_dto_1.UpdateVariableDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Guncellenen variable',
        type: variable_dto_1.VariableDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Alan eksik veya dogrulama hatasi' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Variable bulunamadi' }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'Ayni environment icinde key tekrari',
    }),
    (0, common_1.Patch)(':variableId'),
    __param(0, (0, common_1.Param)('variableId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, variable_dto_1.UpdateVariableDto]),
    __metadata("design:returntype", Promise)
], VariableController.prototype, "updateVariable", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Variable siler' }),
    (0, swagger_1.ApiParam)({
        name: 'variableId',
        description: 'Silinecek variable UUID',
        example: '550e8400-e29b-41d4-a716-446655440003',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Silinen variable',
        type: variable_dto_1.VariableDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Variable bulunamadi' }),
    (0, common_1.Delete)(':variableId'),
    __param(0, (0, common_1.Param)('variableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VariableController.prototype, "deleteVariable", null);
exports.VariableController = VariableController = __decorate([
    (0, swagger_1.ApiTags)('Variables'),
    (0, common_1.Controller)('variables'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __metadata("design:paramtypes", [variable_service_1.VariableService])
], VariableController);
//# sourceMappingURL=variable.controller.js.map