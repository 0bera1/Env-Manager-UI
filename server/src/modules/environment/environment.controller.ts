import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import type { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateEnvironmentDto,
  CreateEnvironmentWithDotenvImportDto,
  CreateEnvironmentWithDotenvImportResultDto,
  EnvironmentDto,
  ImportEnvironmentDotenvDto,
  ImportEnvironmentDotenvResultDto,
} from './environment.dto';
import { EnvironmentService } from './environment.service';

@ApiTags('Environments')
@Controller('environments')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class EnvironmentController {
  public constructor(
    private readonly environmentService: EnvironmentService,
  ) {}

  @ApiOperation({
    summary: 'Kullaniciya ait environment listesini getirir',
    description: 'Siralama: olusturulma zamani (yeniden eskiye).',
  })
  @ApiParam({
    name: 'userId',
    description: 'Kullanici (User) UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Environment listesi',
    type: EnvironmentDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Gecersiz veya eksik parametre' })
  @Get('user/:userId')
  public async getEnvironmentsByUserId(
    @Param('userId') userId: string,
  ): Promise<EnvironmentDto[]> {
    return this.environmentService.getEnvironmentsByUserId(userId);
  }

  @ApiOperation({
    summary: 'Environment degiskenlerini .env metni olarak indirir',
    description:
      'Her satir KEY=VALUE bicimindedir; dosya olarak kaydetip projeye .env koyabilirsiniz.',
  })
  @ApiParam({
    name: 'environmentId',
    description: 'Environment UUID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @ApiProduces('text/plain')
  @ApiOkResponse({
    description: 'Dotenv icerigi (UTF-8 plain text)',
    schema: { type: 'string', example: 'API_URL=https://api.com\nJWT_SECRET=123456\n' },
  })
  @ApiNotFoundResponse({ description: 'Environment bulunamadi' })
  @Get(':environmentId/export')
  public async exportEnvironmentDotenv(
    @Param('environmentId') environmentId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string> {
    const { dotenvContent, attachmentFileName } =
      await this.environmentService.exportEnvironmentAsDotenv(environmentId);

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${attachmentFileName}"`,
    );

    return dotenvContent;
  }

  @ApiOperation({
    summary:
      'Yeni environment olusturur ve dotenv icerigini tek istekte ice aktarir',
    description:
      'DBde henuz kaydi olmayan bir environment adi ile birlikte .env metni gonderilir; transaction icinde environment ve degiskenler olusturulur.',
  })
  @ApiBody({ type: CreateEnvironmentWithDotenvImportDto })
  @ApiCreatedResponse({
    description: 'Environment ve ice aktarma özeti',
    type: CreateEnvironmentWithDotenvImportResultDto,
  })
  @ApiBadRequestResponse({
    description: 'Dogrulama hatasi veya gecersiz userId (FK)',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('import')
  public async createEnvironmentWithDotenvImport(
    @Body() payload: CreateEnvironmentWithDotenvImportDto,
  ): Promise<CreateEnvironmentWithDotenvImportResultDto> {
    return this.environmentService.createEnvironmentWithDotenvImport(payload);
  }

  @ApiOperation({
    summary: 'Dotenv metnini environmenta ice aktarir',
    description:
      'merge: ayni key varsa value guncellenir, diger keyler kalir. replaceAll: mevcutlar silinir, sadece dosyadakiler kalir.',
  })
  @ApiParam({
    name: 'environmentId',
    description: 'Environment UUID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @ApiBody({ type: ImportEnvironmentDotenvDto })
  @ApiOkResponse({
    description: 'Ice aktarma ozeti',
    type: ImportEnvironmentDotenvResultDto,
  })
  @ApiNotFoundResponse({ description: 'Environment bulunamadi' })
  @Post(':environmentId/import')
  public async importEnvironmentDotenv(
    @Param('environmentId') environmentId: string,
    @Body() payload: ImportEnvironmentDotenvDto,
  ): Promise<ImportEnvironmentDotenvResultDto> {
    return this.environmentService.importEnvironmentFromDotenv(
      environmentId,
      payload,
    );
  }

  @ApiOperation({ summary: 'Yeni environment olusturur' })
  @ApiBody({ type: CreateEnvironmentDto })
  @ApiCreatedResponse({
    description: 'Environment olusturuldu',
    type: EnvironmentDto,
  })
  @ApiBadRequestResponse({ description: 'Dogrulama hatasi' })
  @Post()
  public async createEnvironment(
    @Body() payload: CreateEnvironmentDto,
  ): Promise<EnvironmentDto> {
    return this.environmentService.createEnvironment(payload);
  }

  @ApiOperation({ summary: 'Environment siler' })
  @ApiParam({
    name: 'environmentId',
    description: 'Silinecek environment kimligi (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @ApiOkResponse({
    description: 'Silinen environment bilgisi',
    type: EnvironmentDto,
  })
  @ApiNotFoundResponse({ description: 'Environment bulunamadi' })
  @Delete(':environmentId')
  public async deleteEnvironment(
    @Param('environmentId') environmentId: string,
  ): Promise<EnvironmentDto> {
    return this.environmentService.deleteEnvironment(environmentId);
  }
}
