import { Injectable } from '@nestjs/common';
import { Environment } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { EnvironmentDto } from './environment.dto';

@Injectable()
export class EnvironmentRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findAllByUserId(userId: string): Promise<EnvironmentDto[]> {
    const environments: Environment[] =
      await this.prismaService.environment.findMany({
        where: { userId },
        select: {
          id: true,
          name: true,
          userId: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

    return environments;
  }

  public async createEnvironment(
    name: string,
    userId: string,
  ): Promise<EnvironmentDto> {
    const createdEnvironment: Environment =
      await this.prismaService.environment.create({
        data: {
          name,
          userId,
        },
        select: {
          id: true,
          name: true,
          userId: true,
          createdAt: true,
        },
      });

    return createdEnvironment;
  }

  public async createEnvironmentWithEnvVariables(
    name: string,
    userId: string,
    items: { key: string; value: string }[],
  ): Promise<EnvironmentDto> {
    return this.prismaService.$transaction(async (tx) => {
      const createdEnvironment: Environment = await tx.environment.create({
        data: {
          name,
          userId,
        },
        select: {
          id: true,
          name: true,
          userId: true,
          createdAt: true,
        },
      });

      if (items.length > 0) {
        await tx.envVariable.createMany({
          data: items.map((row) => ({
            key: row.key,
            value: row.value,
            environmentId: createdEnvironment.id,
            isSecret: false,
          })),
        });
      }

      return createdEnvironment;
    });
  }

  public async findEnvironmentById(environmentId: string): Promise<Environment | null> {
    return this.prismaService.environment.findUnique({
      where: { id: environmentId },
      select: {
        id: true,
        name: true,
        userId: true,
        createdAt: true,
      },
    });
  }

  public async findEnvVariablesKeyValueByEnvironmentId(
    environmentId: string,
  ): Promise<{ key: string; value: string }[]> {
    return this.prismaService.envVariable.findMany({
      where: { environmentId },
      select: {
        key: true,
        value: true,
      },
      orderBy: { key: 'asc' },
    });
  }

  public async findEnvVariableByKeyAndEnvironmentId(
    environmentId: string,
    key: string,
  ): Promise<{ id: string } | null> {
    return this.prismaService.envVariable.findUnique({
      where: {
        key_environmentId: {
          key,
          environmentId,
        },
      },
      select: { id: true },
    });
  }

  public async upsertEnvVariableByKeyAndEnvironmentId(
    environmentId: string,
    key: string,
    value: string,
  ): Promise<void> {
    await this.prismaService.envVariable.upsert({
      where: {
        key_environmentId: {
          key,
          environmentId,
        },
      },
      create: {
        key,
        value,
        environmentId,
        isSecret: false,
      },
      update: {
        value,
      },
    });
  }

  public async replaceAllEnvVariablesForEnvironment(
    environmentId: string,
    items: { key: string; value: string }[],
  ): Promise<{ removed: number; created: number }> {
    return this.prismaService.$transaction(async (tx) => {
      const deleted = await tx.envVariable.deleteMany({
        where: { environmentId },
      });

      if (items.length === 0) {
        return { removed: deleted.count, created: 0 };
      }

      const created = await tx.envVariable.createMany({
        data: items.map((row) => ({
          key: row.key,
          value: row.value,
          environmentId,
          isSecret: false,
        })),
      });

      return { removed: deleted.count, created: created.count };
    });
  }

  public async deleteEnvironmentById(environmentId: string): Promise<EnvironmentDto> {
    const deletedEnvironment: Environment =
      await this.prismaService.environment.delete({
        where: { id: environmentId },
        select: {
          id: true,
          name: true,
          userId: true,
          createdAt: true,
        },
      });

    return deletedEnvironment;
  }
}
