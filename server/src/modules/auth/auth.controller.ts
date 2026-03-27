import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthLoginDto, AuthRegisterDto, AuthTokenDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() payload: AuthRegisterDto): Promise<AuthTokenDto> {
    return this.authService.register(payload);
  }

  @Post('login')
  public async login(@Body() payload: AuthLoginDto): Promise<AuthTokenDto> {
    return this.authService.login(payload);
  }
}
