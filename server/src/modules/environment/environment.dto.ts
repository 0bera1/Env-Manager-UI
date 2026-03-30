import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEnvironmentDto {
  @ApiProperty({
    example: 'Production',
    description: 'Environment adi',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Environmentin ait oldugu kullanici (User) kimligi',
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  public userId!: string;
}

export class EnvironmentDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Environment kimligi',
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  public id!: string;

  @ApiProperty({ example: 'Production' })
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Sahip kullanici kimligi',
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  public userId!: string;

  @ApiProperty({
    description: 'Olusturulma zamani',
    example: '2026-03-30T12:34:56.000Z',
    type: String,
    format: 'date-time',
  })
  public createdAt!: Date;
}

export class CreateEnvironmentWithDotenvImportDto {
  @ApiProperty({
    example: 'Production',
    description: 'Olusturulacak environment adi (henuz DBde yok)',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Bu environmentin ait olacagi kullanici',
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  public userId!: string;

  @ApiProperty({
    description:
      'Ice aktarilacak dotenv metni (export ile uyumlu KEY=VALUE satirlari)',
    example: 'API_URL=https://api.com\nJWT_SECRET=123456\n',
  })
  @IsString()
  public content!: string;
}

export class ImportEnvironmentDotenvDto {
  @ApiProperty({
    description:
      'Ice aktarilacak dotenv metni (export ile uyumlu KEY=VALUE satirlari)',
    example: 'API_URL=https://api.com\nJWT_SECRET=123456\n',
  })
  @IsString()
  public content!: string;

  @ApiPropertyOptional({
    description:
      'true ise mevcut degiskenler silinir, sadece bu dosyadaki keyler kalir',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  public replaceAll?: boolean;
}

export class ImportEnvironmentDotenvResultDto {
  @ApiProperty({ description: 'Yeni olusturulan kayit sayisi' })
  public created!: number;

  @ApiProperty({ description: 'Guncellenen kayit sayisi (merge modu)' })
  public updated!: number;

  @ApiProperty({
    description:
      'Silinen kayit sayisi (replaceAll: once tumu silinirken veya sadece silim)',
  })
  public removed!: number;

  @ApiProperty({
    description: 'Ice aktarilan benzersiz key sayisi (dosya icinden)',
  })
  public importedKeys!: number;

  @ApiProperty({
    description:
      'Okunamayan satir sayisi (bos/yorum disi ama KEY=VALUE bicimi degil)',
  })
  public skippedLines!: number;
}

export class CreateEnvironmentWithDotenvImportResultDto {
  @ApiProperty({ type: EnvironmentDto })
  public environment!: EnvironmentDto;

  @ApiProperty({ type: ImportEnvironmentDotenvResultDto })
  public import!: ImportEnvironmentDotenvResultDto;
}
