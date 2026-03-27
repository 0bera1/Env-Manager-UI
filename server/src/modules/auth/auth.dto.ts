import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  @IsNotEmpty()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  public password!: string;
}

export class AuthRegisterDto {
  @IsString()
  @IsNotEmpty()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  public password!: string;
}

export class AuthTokenDto {
  @IsString()
  @IsNotEmpty()
  public accessToken!: string;
}
