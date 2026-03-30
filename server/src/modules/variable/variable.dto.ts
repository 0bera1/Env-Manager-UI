import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateVariableDto {
  @ApiProperty({ example: 'API_URL', description: 'Degisken anahtari' })
  @IsString()
  @IsNotEmpty()
  public key!: string;

  @ApiProperty({
    example: 'https://api.example.com',
    description: 'Degisken degeri (bos string olabilir)',
  })
  @IsString()
  public value!: string;

  @ApiPropertyOptional({
    description: 'Gizli deger mi (UI maskeleme vb. icin)',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  public isSecret?: boolean;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'Bagli oldugu environment kimligi',
    format: 'uuid',
  })
  @IsUUID()
  public environmentId!: string;
}

export class UpdateVariableDto {
  @ApiPropertyOptional({ example: 'API_URL' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public key?: string;

  @ApiPropertyOptional({
    example: 'https://api.example.com',
    description: 'Deger guncellenmeyecekse gondermeyin',
  })
  @IsOptional()
  @IsString()
  public value?: string;

  @ApiPropertyOptional({ description: 'Gizli isaretini guncelle' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  public isSecret?: boolean;
}

export class VariableDto {
  @ApiProperty({ format: 'uuid' })
  public id!: string;

  @ApiProperty({ example: 'API_URL' })
  public key!: string;

  @ApiProperty()
  public value!: string;

  @ApiProperty()
  public isSecret!: boolean;

  @ApiProperty({ format: 'uuid' })
  public environmentId!: string;

  @ApiProperty({ type: String, format: 'date-time' })
  public createdAt!: Date;
}
