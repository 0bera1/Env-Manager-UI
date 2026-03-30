import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { AuthLoginDto, AuthRegisterDto, AuthTokenDto } from './auth.dto';
export declare class AuthService {
    private readonly authRepository;
    private readonly jwtService;
    constructor(authRepository: AuthRepository, jwtService: JwtService);
    register(payload: AuthRegisterDto): Promise<AuthTokenDto>;
    login(payload: AuthLoginDto): Promise<AuthTokenDto>;
    private normalizeEmail;
    private normalizePhone;
    private hashPassword;
    private verifyPassword;
    private createTokenResponse;
}
