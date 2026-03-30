import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
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
  @ApiCreatedResponse({
    description: 'Kayit basarili; JWT access token',
    type: AuthTokenDto,
  })
  @ApiConflictResponse({
    description: 'E-posta veya telefon numarasi zaten kullanimda',
  })
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
  @ApiUnauthorizedResponse({
    description: 'Kimlik bilgileri veya sifre hatali',
  })
  @ApiBadRequestResponse({
    description: 'E-posta ve telefon ayni istekte gonderilemez veya alanlar gecersiz',
  })
  @Post('login')
  public async login(@Body() payload: AuthLoginDto): Promise<AuthTokenDto> {
    return this.authService.login(payload);
  }
}
