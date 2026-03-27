import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { AuthRepository } from './auth.repository';
import { AuthLoginDto, AuthRegisterDto, AuthTokenDto } from './auth.dto';

@Injectable()
export class AuthService {
  public constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async register(payload: AuthRegisterDto): Promise<AuthTokenDto> {
    const existingUser = await this.authRepository.findUserByEmail(payload.email);
    if (existingUser !== null) {
      throw new ConflictException('Bu e-posta adresi zaten kullaniliyor.');
    }

    const hashedPassword = this.hashPassword(payload.password);
    const createdUser = await this.authRepository.createUser(
      payload.email,
      hashedPassword,
    );

    return this.createTokenResponse(createdUser.id, createdUser.email);
  }

  public async login(payload: AuthLoginDto): Promise<AuthTokenDto> {
    const user = await this.authRepository.findUserByEmail(payload.email);
    if (user === null) {
      throw new UnauthorizedException('E-posta veya sifre hatali.');
    }

    const isPasswordValid = this.verifyPassword(payload.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('E-posta veya sifre hatali.');
    }

    return this.createTokenResponse(user.id, user.email);
  }

  private hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${derivedKey}`;
  }

  private verifyPassword(password: string, storedHash: string): boolean {
    const hashParts = storedHash.split(':');
    if (hashParts.length !== 2) {
      return false;
    }

    const salt = hashParts[0];
    const originalHash = hashParts[1];
    const recalculatedHash = scryptSync(password, salt, 64).toString('hex');

    const originalBuffer = Buffer.from(originalHash, 'hex');
    const recalculatedBuffer = Buffer.from(recalculatedHash, 'hex');

    if (originalBuffer.length !== recalculatedBuffer.length) {
      return false;
    }

    return timingSafeEqual(originalBuffer, recalculatedBuffer);
  }

  private createTokenResponse(userId: string, email: string): AuthTokenDto {
    const accessToken = this.jwtService.sign({
      sub: userId,
      email,
    });

    return { accessToken };
  }
}
