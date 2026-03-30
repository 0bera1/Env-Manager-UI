import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class AuthLoginDto {
  @ApiPropertyOptional({
    example: 'test@example.com',
    description: 'E-posta ile giris (telefon ile birlikte kullanilamaz)',
  })
  @ValidateIf((o: AuthLoginDto) => o.phone === undefined || o.phone.trim() === '')
  @IsEmail()
  public email?: string;

  @ApiPropertyOptional({
    example: '+905551112233',
    description: 'Telefon ile giris, E.164 veya ulke kodu dahil (TR)',
  })
  @ValidateIf((o: AuthLoginDto) => o.email === undefined || o.email.trim() === '')
  @IsPhoneNumber('TR')
  public phone?: string;

  @ApiProperty({
    example: 'GucluSifre123',
    description: 'Kullanici sifresi',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  public password!: string;
}

export class AuthRegisterDto {
  @ApiPropertyOptional({
    example: 'Yeni Kullanici',
    description: 'Gorunen ad (istege bagli)',
    maxLength: 120,
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  public fullName?: string;

  @ApiProperty({
    example: 'newuser@example.com',
    description: 'Kayit e-posta adresi',
  })
  @IsEmail()
  public email!: string;

  @ApiProperty({
    example: '+905551112233',
    description: 'Kayit telefon numarasi (TR, benzersiz)',
  })
  @IsPhoneNumber('TR')
  public phone!: string;

  @ApiProperty({
    example: 'GucluSifre123',
    description: 'En az 8 karakter',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  public password!: string;
}

export class AuthTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  @IsString()
  @IsNotEmpty()
  public accessToken!: string;
}
