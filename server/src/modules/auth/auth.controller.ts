import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthLoginDto, AuthRegisterDto, AuthTokenDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Yeni kullanici kaydi olusturur' })
  @ApiBody({ type: AuthRegisterDto })
  @ApiOkResponse({
    description: 'Kayit basarili ve token dondu',
    type: AuthTokenDto,
  })
  @ApiConflictResponse({ description: 'E-posta zaten kullanimda' })
  @Post('register')
  public async register(@Body() payload: AuthRegisterDto): Promise<AuthTokenDto> {
    return this.authService.register(payload);
  }

  @ApiOperation({ summary: 'Kullanici girisi yapar' })
  @ApiBody({ type: AuthLoginDto })
  @ApiOkResponse({
    description: 'Login basarili ve token dondu',
    type: AuthTokenDto,
  })
  @ApiUnauthorizedResponse({ description: 'E-posta veya sifre hatali' })
  @Post('login')
  public async login(@Body() payload: AuthLoginDto): Promise<AuthTokenDto> {
    return this.authService.login(payload);
  }
}
