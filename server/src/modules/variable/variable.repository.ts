import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { VariableDto } from './variable.dto';

const variableSelect = {
  id: true,
  key: true,
  value: true,
  isSecret: true,
  environmentId: true,
  createdAt: true,
} as const;

@Injectable()
export class VariableRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findAllByEnvironmentId(
    environmentId: string,
  ): Promise<VariableDto[]> {
    return this.prismaService.envVariable.findMany({
      where: { environmentId },
      select: { ...variableSelect },
      orderBy: { key: 'asc' },
    });
  }

  public async findEnvVariableById(
    variableId: string,
  ): Promise<VariableDto | null> {
    return this.prismaService.envVariable.findUnique({
      where: { id: variableId },
      select: { ...variableSelect },
    });
  }

  public async createEnvVariable(data: {
    key: string;
    value: string;
    isSecret: boolean;
    environmentId: string;
  }): Promise<VariableDto> {
    return this.prismaService.envVariable.create({
      data: {
        key: data.key,
        value: data.value,
        isSecret: data.isSecret,
        environmentId: data.environmentId,
      },
      select: { ...variableSelect },
    });
  }

  public async updateEnvVariableById(
    variableId: string,
    data: Prisma.EnvVariableUpdateInput,
  ): Promise<VariableDto> {
    return this.prismaService.envVariable.update({
      where: { id: variableId },
      data,
      select: { ...variableSelect },
    });
  }

  public async deleteEnvVariableById(variableId: string): Promise<VariableDto> {
    return this.prismaService.envVariable.delete({
      where: { id: variableId },
      select: { ...variableSelect },
    });
  }
}
