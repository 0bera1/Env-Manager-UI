import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateVariableDto,
  UpdateVariableDto,
  VariableDto,
} from './variable.dto';
import { VariableService } from './variable.service';

@ApiTags('Variables')
@Controller('variables')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class VariableController {
  public constructor(private readonly variableService: VariableService) {}

  @ApiOperation({ summary: 'Yeni environment degiskeni olusturur' })
  @ApiBody({ type: CreateVariableDto })
  @ApiCreatedResponse({
    description: 'Variable olusturuldu',
    type: VariableDto,
  })
  @ApiBadRequestResponse({ description: 'Dogrulama veya gecersiz environment' })
  @ApiConflictResponse({
    description: 'Ayni environment icinde key tekrari',
  })
  @Post()
  public async createVariable(
    @Body() payload: CreateVariableDto,
  ): Promise<VariableDto> {
    return this.variableService.createVariable(payload);
  }

  @ApiOperation({
    summary: 'Bir environmenta ait degiskenleri listeler',
    description: 'Siralama: anahtar (A-Z).',
  })
  @ApiParam({
    name: 'environmentId',
    description: 'Environment UUID',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  @ApiOkResponse({
    description: 'Variable listesi',
    type: VariableDto,
    isArray: true,
  })
  @Get('environment/:environmentId')
  public async getVariablesByEnvironmentId(
    @Param('environmentId') environmentId: string,
  ): Promise<VariableDto[]> {
    return this.variableService.getVariablesByEnvironmentId(environmentId);
  }

  @ApiOperation({ summary: 'Variable gunceller (kismi alanlar)' })
  @ApiParam({
    name: 'variableId',
    description: 'Variable UUID',
    example: '550e8400-e29b-41d4-a716-446655440003',
  })
  @ApiBody({ type: UpdateVariableDto })
  @ApiOkResponse({
    description: 'Guncellenen variable',
    type: VariableDto,
  })
  @ApiBadRequestResponse({ description: 'Alan eksik veya dogrulama hatasi' })
  @ApiNotFoundResponse({ description: 'Variable bulunamadi' })
  @ApiConflictResponse({
    description: 'Ayni environment icinde key tekrari',
  })
  @Patch(':variableId')
  public async updateVariable(
    @Param('variableId') variableId: string,
    @Body() payload: UpdateVariableDto,
  ): Promise<VariableDto> {
    return this.variableService.updateVariable(variableId, payload);
  }

  @ApiOperation({ summary: 'Variable siler' })
  @ApiParam({
    name: 'variableId',
    description: 'Silinecek variable UUID',
    example: '550e8400-e29b-41d4-a716-446655440003',
  })
  @ApiOkResponse({
    description: 'Silinen variable',
    type: VariableDto,
  })
  @ApiNotFoundResponse({ description: 'Variable bulunamadi' })
  @Delete(':variableId')
  public async deleteVariable(
    @Param('variableId') variableId: string,
  ): Promise<VariableDto> {
    return this.variableService.deleteVariable(variableId);
  }
}
