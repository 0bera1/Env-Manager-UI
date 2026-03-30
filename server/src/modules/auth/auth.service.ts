import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
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
    const email: string = this.normalizeEmail(payload.email);
    const phone: string = this.normalizePhone(payload.phone);

    const existingByEmail = await this.authRepository.findUserByEmail(email);
    if (existingByEmail !== null) {
      throw new ConflictException('Bu e-posta adresi zaten kullaniliyor.');
    }

    const existingByPhone = await this.authRepository.findUserByPhone(phone);
    if (existingByPhone !== null) {
      throw new ConflictException('Bu telefon numarasi zaten kullaniliyor.');
    }

    const hashedPassword = this.hashPassword(payload.password);
    const createdUser = await this.authRepository.createUser({
      email,
      phone,
      fullName: payload.fullName,
      hashedPassword,
    });

    return this.createTokenResponse(
      createdUser.id,
      createdUser.email,
      createdUser.phone,
    );
  }

  public async login(payload: AuthLoginDto): Promise<AuthTokenDto> {
    const password: string = payload.password;
    const emailRaw: string | undefined = payload.email;
    const phoneRaw: string | undefined = payload.phone;

    const emailPresent: boolean = emailRaw !== undefined && emailRaw.trim().length > 0;
    const phonePresent: boolean = phoneRaw !== undefined && phoneRaw.trim().length > 0;

    if (emailPresent && phonePresent) {
      throw new BadRequestException(
        'E-posta ve telefon ayni istekte birlikte gonderilemez.',
      );
    }

    let user: User | null;
    if (emailPresent && emailRaw !== undefined) {
      user = await this.authRepository.findUserByEmail(
        this.normalizeEmail(emailRaw),
      );
    } else if (phonePresent && phoneRaw !== undefined) {
      user = await this.authRepository.findUserByPhone(
        this.normalizePhone(phoneRaw),
      );
    } else {
      throw new BadRequestException(
        'Giris icin ya e-posta ya da telefon numarasi gonderilmelidir.',
      );
    }

    if (user === null) {
      throw new UnauthorizedException(
        'Gecersiz kimlik bilgileri veya sifre hatali.',
      );
    }

    const isPasswordValid = this.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Gecersiz kimlik bilgileri veya sifre hatali.',
      );
    }

    return this.createTokenResponse(user.id, user.email, user.phone);
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private normalizePhone(phone: string): string {
    return phone.trim();
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

  private createTokenResponse(
    userId: string,
    email: string,
    phone: string,
  ): AuthTokenDto {
    const accessToken = this.jwtService.sign({
      sub: userId,
      email,
      phone,
    });

    return { accessToken };
  }
}
