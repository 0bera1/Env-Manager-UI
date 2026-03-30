import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  CreateVariableDto,
  UpdateVariableDto,
  VariableDto,
} from './variable.dto';
import { VariableRepository } from './variable.repository';

@Injectable()
export class VariableService {
  public constructor(private readonly variableRepository: VariableRepository) {}

  public async createVariable(
    payload: CreateVariableDto,
  ): Promise<VariableDto> {
    const isSecret: boolean = payload.isSecret ?? false;

    try {
      return await this.variableRepository.createEnvVariable({
        key: payload.key.trim(),
        value: payload.value,
        isSecret,
        environmentId: payload.environmentId,
      });
    } catch (error: unknown) {
      this.rethrowPrismaVariableError(error);
    }
  }

  public async getVariablesByEnvironmentId(
    environmentId: string,
  ): Promise<VariableDto[]> {
    return this.variableRepository.findAllByEnvironmentId(environmentId);
  }

  public async updateVariable(
    variableId: string,
    payload: UpdateVariableDto,
  ): Promise<VariableDto> {
    const hasKey: boolean = payload.key !== undefined;
    const hasValue: boolean = payload.value !== undefined;
    const hasSecret: boolean = payload.isSecret !== undefined;

    if (!hasKey && !hasValue && !hasSecret) {
      throw new BadRequestException(
        'Guncelleme icin en az bir alan (key, value, isSecret) gonderilmelidir.',
      );
    }

    const existing: VariableDto | null =
      await this.variableRepository.findEnvVariableById(variableId);

    if (existing === null) {
      throw new NotFoundException('Variable bulunamadi.');
    }

    const data: Prisma.EnvVariableUpdateInput = {};

    if (hasKey && payload.key !== undefined) {
      data.key = payload.key.trim();
    }

    if (hasValue && payload.value !== undefined) {
      data.value = payload.value;
    }

    if (hasSecret && payload.isSecret !== undefined) {
      data.isSecret = payload.isSecret;
    }

    try {
      return await this.variableRepository.updateEnvVariableById(
        variableId,
        data,
      );
    } catch (error: unknown) {
      this.rethrowPrismaVariableError(error);
    }
  }

  public async deleteVariable(variableId: string): Promise<VariableDto> {
    const existing: VariableDto | null =
      await this.variableRepository.findEnvVariableById(variableId);

    if (existing === null) {
      throw new NotFoundException('Variable bulunamadi.');
    }

    return this.variableRepository.deleteEnvVariableById(variableId);
  }

  private rethrowPrismaVariableError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new ConflictException(
            'Bu environment icinde bu anahtar zaten kullaniliyor.',
          );
        case 'P2003':
          throw new BadRequestException(
            'Gecersiz environment kimligi veya bagimlilik hatasi.',
          );
        case 'P2025':
          throw new NotFoundException('Variable bulunamadi.');
        default:
          break;
      }
    }

    throw error;
  }
}
