import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProjectDto, ProjectDto } from './project.dto';
import { ProjectService } from './project.service';

@ApiTags('Projects')
@Controller('projects')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ProjectController {
  public constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({
    summary: 'Kullaniciya ait projeleri listeler',
    description: 'Siralama: proje adi (A-Z).',
  })
  @ApiParam({
    name: 'userId',
    description: 'Kullanici (User) UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Proje listesi',
    type: ProjectDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Gecersiz veya eksik parametre' })
  @Get('user/:userId')
  public async getProjectsByUserId(
    @Param('userId') userId: string,
  ): Promise<ProjectDto[]> {
    return this.projectService.getProjectsByUserId(userId);
  }

  @ApiOperation({
    summary: 'Yeni proje olusturur',
    description: '`userId` veritabaninda mevcut bir kullaniciya ait olmalidir (FK).',
  })
  @ApiBody({ type: CreateProjectDto })
  @ApiCreatedResponse({
    description: 'Proje olusturuldu',
    type: ProjectDto,
  })
  @ApiBadRequestResponse({ description: 'Dogrulama hatasi' })
  @Post()
  public async createProject(@Body() payload: CreateProjectDto): Promise<ProjectDto> {
    return this.projectService.createProject(payload);
  }
}
