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
exports.VariableDto = exports.UpdateVariableDto = exports.CreateVariableDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateVariableDto {
    key;
    value;
    isSecret;
    environmentId;
}
exports.CreateVariableDto = CreateVariableDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'API_URL', description: 'Degisken anahtari' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVariableDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://api.example.com',
        description: 'Degisken degeri (bos string olabilir)',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVariableDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Gizli deger mi (UI maskeleme vb. icin)',
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], CreateVariableDto.prototype, "isSecret", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440002',
        description: 'Bagli oldugu environment kimligi',
        format: 'uuid',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateVariableDto.prototype, "environmentId", void 0);
class UpdateVariableDto {
    key;
    value;
    isSecret;
}
exports.UpdateVariableDto = UpdateVariableDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'API_URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateVariableDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://api.example.com',
        description: 'Deger guncellenmeyecekse gondermeyin',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateVariableDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Gizli isaretini guncelle' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], UpdateVariableDto.prototype, "isSecret", void 0);
class VariableDto {
    id;
    key;
    value;
    isSecret;
    environmentId;
    createdAt;
}
exports.VariableDto = VariableDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], VariableDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'API_URL' }),
    __metadata("design:type", String)
], VariableDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VariableDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], VariableDto.prototype, "isSecret", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], VariableDto.prototype, "environmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], VariableDto.prototype, "createdAt", void 0);
//# sourceMappingURL=variable.dto.js.map