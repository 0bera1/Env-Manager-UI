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
exports.AuthTokenDto = exports.AuthRegisterDto = exports.AuthLoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AuthLoginDto {
    email;
    phone;
    password;
}
exports.AuthLoginDto = AuthLoginDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'test@example.com',
        description: 'E-posta ile giris (telefon ile birlikte kullanilamaz)',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.phone === undefined || o.phone.trim() === ''),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthLoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '+905551112233',
        description: 'Telefon ile giris, E.164 veya ulke kodu dahil (TR)',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.email === undefined || o.email.trim() === ''),
    (0, class_validator_1.IsPhoneNumber)('TR'),
    __metadata("design:type", String)
], AuthLoginDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'GucluSifre123',
        description: 'Kullanici sifresi',
        minLength: 8,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(128),
    __metadata("design:type", String)
], AuthLoginDto.prototype, "password", void 0);
class AuthRegisterDto {
    fullName;
    email;
    phone;
    password;
}
exports.AuthRegisterDto = AuthRegisterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Yeni Kullanici',
        description: 'Gorunen ad (istege bagli)',
        maxLength: 120,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'newuser@example.com',
        description: 'Kayit e-posta adresi',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+905551112233',
        description: 'Kayit telefon numarasi (TR, benzersiz)',
    }),
    (0, class_validator_1.IsPhoneNumber)('TR'),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'GucluSifre123',
        description: 'En az 8 karakter',
        minLength: 8,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(128),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "password", void 0);
class AuthTokenDto {
    accessToken;
}
exports.AuthTokenDto = AuthTokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT access token',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthTokenDto.prototype, "accessToken", void 0);
//# sourceMappingURL=auth.dto.js.map