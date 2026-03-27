import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    example: 'test@example.com',
    description: 'Kullanici e-posta adresi',
  })
  @IsString()
  @IsNotEmpty()
  public email!: string;

  @ApiProperty({
    example: '123456',
    description: 'Kullanici sifresi',
  })
  @IsString()
  @IsNotEmpty()
  public password!: string;
}

export class AuthRegisterDto {
  @ApiProperty({
    example: 'newuser@example.com',
    description: 'Kayit olacak kullanici e-posta adresi',
  })
  @IsString()
  @IsNotEmpty()
  public email!: string;

  @ApiProperty({
    example: '123456',
    description: 'Kayit olacak kullanici sifresi',
  })
  @IsString()
  @IsNotEmpty()
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
