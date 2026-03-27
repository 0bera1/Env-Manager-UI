import { AuthLoginDto, AuthRegisterDto, AuthTokenDto } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(payload: AuthRegisterDto): Promise<AuthTokenDto>;
    login(payload: AuthLoginDto): Promise<AuthTokenDto>;
}
