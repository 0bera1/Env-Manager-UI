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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = require("crypto");
const auth_repository_1 = require("./auth.repository");
let AuthService = class AuthService {
    authRepository;
    jwtService;
    constructor(authRepository, jwtService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
    }
    async register(payload) {
        const existingUser = await this.authRepository.findUserByEmail(payload.email);
        if (existingUser !== null) {
            throw new common_1.ConflictException('Bu e-posta adresi zaten kullaniliyor.');
        }
        const hashedPassword = this.hashPassword(payload.password);
        const createdUser = await this.authRepository.createUser(payload.email, hashedPassword);
        return this.createTokenResponse(createdUser.id, createdUser.email);
    }
    async login(payload) {
        const user = await this.authRepository.findUserByEmail(payload.email);
        if (user === null) {
            throw new common_1.UnauthorizedException('E-posta veya sifre hatali.');
        }
        const isPasswordValid = this.verifyPassword(payload.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('E-posta veya sifre hatali.');
        }
        return this.createTokenResponse(user.id, user.email);
    }
    hashPassword(password) {
        const salt = (0, crypto_1.randomBytes)(16).toString('hex');
        const derivedKey = (0, crypto_1.scryptSync)(password, salt, 64).toString('hex');
        return `${salt}:${derivedKey}`;
    }
    verifyPassword(password, storedHash) {
        const hashParts = storedHash.split(':');
        if (hashParts.length !== 2) {
            return false;
        }
        const salt = hashParts[0];
        const originalHash = hashParts[1];
        const recalculatedHash = (0, crypto_1.scryptSync)(password, salt, 64).toString('hex');
        const originalBuffer = Buffer.from(originalHash, 'hex');
        const recalculatedBuffer = Buffer.from(recalculatedHash, 'hex');
        if (originalBuffer.length !== recalculatedBuffer.length) {
            return false;
        }
        return (0, crypto_1.timingSafeEqual)(originalBuffer, recalculatedBuffer);
    }
    createTokenResponse(userId, email) {
        const accessToken = this.jwtService.sign({
            sub: userId,
            email,
        });
        return { accessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map