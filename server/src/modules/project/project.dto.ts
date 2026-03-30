import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Uretim API',
    description: 'Proje adi',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Projenin ait oldugu kullanici (User) kimligi',
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  public userId!: string;
}

export class ProjectDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Proje kimligi',
    format: 'uuid',
  })
  public id!: string;

  @ApiProperty({ example: 'Uretim API' })
  public name!: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Sahip kullanici kimligi',
    format: 'uuid',
  })
  public userId!: string;
}
