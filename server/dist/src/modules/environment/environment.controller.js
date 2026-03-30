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
exports.EnvironmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const environment_dto_1 = require("./environment.dto");
const environment_service_1 = require("./environment.service");
let EnvironmentController = class EnvironmentController {
    environmentService;
    constructor(environmentService) {
        this.environmentService = environmentService;
    }
    async getEnvironmentsByUserId(userId) {
        return this.environmentService.getEnvironmentsByUserId(userId);
    }
    async exportEnvironmentDotenv(environmentId, res) {
        const { dotenvContent, attachmentFileName } = await this.environmentService.exportEnvironmentAsDotenv(environmentId);
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${attachmentFileName}"`);
        return dotenvContent;
    }
    async createEnvironmentWithDotenvImport(payload) {
        return this.environmentService.createEnvironmentWithDotenvImport(payload);
    }
    async importEnvironmentDotenv(environmentId, payload) {
        return this.environmentService.importEnvironmentFromDotenv(environmentId, payload);
    }
    async createEnvironment(payload) {
        return this.environmentService.createEnvironment(payload);
    }
    async deleteEnvironment(environmentId) {
        return this.environmentService.deleteEnvironment(environmentId);
    }
};
exports.EnvironmentController = EnvironmentController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Kullaniciya ait environment listesini getirir',
        description: 'Siralama: olusturulma zamani (yeniden eskiye).',
    }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        description: 'Kullanici (User) UUID',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Environment listesi',
        type: environment_dto_1.EnvironmentDto,
        isArray: true,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Gecersiz veya eksik parametre' }),
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnvironmentController.prototype, "getEnvironmentsByUserId", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Environment degiskenlerini .env metni olarak indirir',
        description: 'Her satir KEY=VALUE bicimindedir; dosya olarak kaydetip projeye .env koyabilirsiniz.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'environmentId',
        description: 'Environment UUID',
        example: '550e8400-e29b-41d4-a716-446655440001',
    }),
    (0, swagger_1.ApiProduces)('text/plain'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Dotenv icerigi (UTF-8 plain text)',
        schema: { type: 'string', example: 'API_URL=https://api.com\nJWT_SECRET=123456\n' },
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Environment bulunamadi' }),
    (0, common_1.Get)(':environmentId/export'),
    __param(0, (0, common_1.Param)('environmentId')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EnvironmentController.prototype, "exportEnvironmentDotenv", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Yeni environment olusturur ve dotenv icerigini tek istekte ice aktarir',
        description: 'DBde henuz kaydi olmayan bir environment adi ile birlikte .env metni gonderilir; transaction icinde environment ve degiskenler olusturulur.',
    }),
    (0, swagger_1.ApiBody)({ type: environment_dto_1.CreateEnvironmentWithDotenvImportDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Environment ve ice aktarma özeti',
        type: environment_dto_1.CreateEnvironmentWithDotenvImportResultDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Dogrulama hatasi veya gecersiz userId (FK)',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('import'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [environment_dto_1.CreateEnvironmentWithDotenvImportDto]),
    __metadata("design:returntype", Promise)
], EnvironmentController.prototype, "createEnvironmentWithDotenvImport", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Dotenv metnini environmenta ice aktarir',
        description: 'merge: ayni key varsa value guncellenir, diger keyler kalir. replaceAll: mevcutlar silinir, sadece dosyadakiler kalir.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'environmentId',
        description: 'Environment UUID',
        example: '550e8400-e29b-41d4-a716-446655440001',
    }),
    (0, swagger_1.ApiBody)({ type: environment_dto_1.ImportEnvironmentDotenvDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Ice aktarma ozeti',
        type: environment_dto_1.ImportEnvironmentDotenvResultDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Environment bulunamadi' }),
    (0, common_1.Post)(':environmentId/import'),
    __param(0, (0, common_1.Param)('environmentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, environment_dto_1.ImportEnvironmentDotenvDto]),
    __metadata("design:returntype", Promise)
], EnvironmentController.prototype, "importEnvironmentDotenv", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Yeni environment olusturur' }),
    (0, swagger_1.ApiBody)({ type: environment_dto_1.CreateEnvironmentDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Environment olusturuldu',
        type: environment_dto_1.EnvironmentDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Dogrulama hatasi' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [environment_dto_1.CreateEnvironmentDto]),
    __metadata("design:returntype", Promise)
], EnvironmentController.prototype, "createEnvironment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Environment siler' }),
    (0, swagger_1.ApiParam)({
        name: 'environmentId',
        description: 'Silinecek environment kimligi (UUID)',
        example: '550e8400-e29b-41d4-a716-446655440001',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Silinen environment bilgisi',
        type: environment_dto_1.EnvironmentDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Environment bulunamadi' }),
    (0, common_1.Delete)(':environmentId'),
    __param(0, (0, common_1.Param)('environmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnvironmentController.prototype, "deleteEnvironment", null);
exports.EnvironmentController = EnvironmentController = __decorate([
    (0, swagger_1.ApiTags)('Environments'),
    (0, common_1.Controller)('environments'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __metadata("design:paramtypes", [environment_service_1.EnvironmentService])
], EnvironmentController);
//# sourceMappingURL=environment.controller.js.map