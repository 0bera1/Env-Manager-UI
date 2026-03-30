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
exports.CreateEnvironmentWithDotenvImportResultDto = exports.ImportEnvironmentDotenvResultDto = exports.ImportEnvironmentDotenvDto = exports.CreateEnvironmentWithDotenvImportDto = exports.EnvironmentDto = exports.CreateEnvironmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateEnvironmentDto {
    name;
    userId;
}
exports.CreateEnvironmentDto = CreateEnvironmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Production',
        description: 'Environment adi',
        maxLength: 200,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEnvironmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Environmentin ait oldugu kullanici (User) kimligi',
        format: 'uuid',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEnvironmentDto.prototype, "userId", void 0);
class EnvironmentDto {
    id;
    name;
    userId;
    createdAt;
}
exports.EnvironmentDto = EnvironmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440001',
        description: 'Environment kimligi',
        format: 'uuid',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Production' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Sahip kullanici kimligi',
        format: 'uuid',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Olusturulma zamani',
        example: '2026-03-30T12:34:56.000Z',
        type: String,
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], EnvironmentDto.prototype, "createdAt", void 0);
class CreateEnvironmentWithDotenvImportDto {
    name;
    userId;
    content;
}
exports.CreateEnvironmentWithDotenvImportDto = CreateEnvironmentWithDotenvImportDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Production',
        description: 'Olusturulacak environment adi (henuz DBde yok)',
        maxLength: 200,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEnvironmentWithDotenvImportDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Bu environmentin ait olacagi kullanici',
        format: 'uuid',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEnvironmentWithDotenvImportDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ice aktarilacak dotenv metni (export ile uyumlu KEY=VALUE satirlari)',
        example: 'API_URL=https://api.com\nJWT_SECRET=123456\n',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEnvironmentWithDotenvImportDto.prototype, "content", void 0);
class ImportEnvironmentDotenvDto {
    content;
    replaceAll;
}
exports.ImportEnvironmentDotenvDto = ImportEnvironmentDotenvDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ice aktarilacak dotenv metni (export ile uyumlu KEY=VALUE satirlari)',
        example: 'API_URL=https://api.com\nJWT_SECRET=123456\n',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImportEnvironmentDotenvDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'true ise mevcut degiskenler silinir, sadece bu dosyadaki keyler kalir',
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], ImportEnvironmentDotenvDto.prototype, "replaceAll", void 0);
class ImportEnvironmentDotenvResultDto {
    created;
    updated;
    removed;
    importedKeys;
    skippedLines;
}
exports.ImportEnvironmentDotenvResultDto = ImportEnvironmentDotenvResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Yeni olusturulan kayit sayisi' }),
    __metadata("design:type", Number)
], ImportEnvironmentDotenvResultDto.prototype, "created", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guncellenen kayit sayisi (merge modu)' }),
    __metadata("design:type", Number)
], ImportEnvironmentDotenvResultDto.prototype, "updated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Silinen kayit sayisi (replaceAll: once tumu silinirken veya sadece silim)',
    }),
    __metadata("design:type", Number)
], ImportEnvironmentDotenvResultDto.prototype, "removed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ice aktarilan benzersiz key sayisi (dosya icinden)',
    }),
    __metadata("design:type", Number)
], ImportEnvironmentDotenvResultDto.prototype, "importedKeys", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Okunamayan satir sayisi (bos/yorum disi ama KEY=VALUE bicimi degil)',
    }),
    __metadata("design:type", Number)
], ImportEnvironmentDotenvResultDto.prototype, "skippedLines", void 0);
class CreateEnvironmentWithDotenvImportResultDto {
    environment;
    import;
}
exports.CreateEnvironmentWithDotenvImportResultDto = CreateEnvironmentWithDotenvImportResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: EnvironmentDto }),
    __metadata("design:type", EnvironmentDto)
], CreateEnvironmentWithDotenvImportResultDto.prototype, "environment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ImportEnvironmentDotenvResultDto }),
    __metadata("design:type", ImportEnvironmentDotenvResultDto)
], CreateEnvironmentWithDotenvImportResultDto.prototype, "import", void 0);
//# sourceMappingURL=environment.dto.js.map