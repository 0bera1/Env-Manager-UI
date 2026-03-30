import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  CreateEnvironmentDto,
  CreateEnvironmentWithDotenvImportDto,
  CreateEnvironmentWithDotenvImportResultDto,
  EnvironmentDto,
  ImportEnvironmentDotenvDto,
  ImportEnvironmentDotenvResultDto,
} from './environment.dto';
import { EnvironmentRepository } from './environment.repository';

@Injectable()
export class EnvironmentService {
  public constructor(
    private readonly environmentRepository: EnvironmentRepository,
  ) {}

  public async getEnvironmentsByUserId(
    userId: string,
  ): Promise<EnvironmentDto[]> {
    return this.environmentRepository.findAllByUserId(userId);
  }

  public async createEnvironment(
    payload: CreateEnvironmentDto,
  ): Promise<EnvironmentDto> {
    return this.environmentRepository.createEnvironment(payload.name, payload.userId);
  }

  public async createEnvironmentWithDotenvImport(
    payload: CreateEnvironmentWithDotenvImportDto,
  ): Promise<CreateEnvironmentWithDotenvImportResultDto> {
    const parseResult: {
      entries: { key: string; value: string }[];
      skippedLines: number;
    } = this.parseDotenvImportContent(payload.content);

    try {
      const environment: EnvironmentDto =
        await this.environmentRepository.createEnvironmentWithEnvVariables(
          payload.name,
          payload.userId,
          parseResult.entries,
        );

      const createdCount: number = parseResult.entries.length;

      const importSummary: ImportEnvironmentDotenvResultDto = {
        created: createdCount,
        updated: 0,
        removed: 0,
        importedKeys: createdCount,
        skippedLines: parseResult.skippedLines,
      };

      return { environment, import: importSummary };
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException(
          'Gecersiz kullanici kimligi veya bagimlilik hatasi.',
        );
      }

      throw error;
    }
  }

  public async deleteEnvironment(environmentId: string): Promise<EnvironmentDto> {
    const existingEnvironment =
      await this.environmentRepository.findEnvironmentById(environmentId);

    if (existingEnvironment === null) {
      throw new NotFoundException('Environment bulunamadi.');
    }

    return this.environmentRepository.deleteEnvironmentById(environmentId);
  }

  public async exportEnvironmentAsDotenv(environmentId: string): Promise<{
    dotenvContent: string;
    attachmentFileName: string;
  }> {
    const existingEnvironment =
      await this.environmentRepository.findEnvironmentById(environmentId);

    if (existingEnvironment === null) {
      throw new NotFoundException('Environment bulunamadi.');
    }

    const rows: { key: string; value: string }[] =
      await this.environmentRepository.findEnvVariablesKeyValueByEnvironmentId(
        environmentId,
      );

    const lines: string[] = rows.map((row: { key: string; value: string }) =>
      this.formatDotenvLine(row.key, row.value),
    );

    const dotenvContent: string =
      lines.length > 0 ? `${lines.join('\n')}\n` : '';

    const downloadFileBaseName: string = this.sanitizeDownloadBaseName(
      existingEnvironment.name,
    );

    const attachmentFileName: string =
      this.buildDotenvAttachmentFileName(downloadFileBaseName);

    return { dotenvContent, attachmentFileName };
  }

  public async importEnvironmentFromDotenv(
    environmentId: string,
    payload: ImportEnvironmentDotenvDto,
  ): Promise<ImportEnvironmentDotenvResultDto> {
    const existingEnvironment =
      await this.environmentRepository.findEnvironmentById(environmentId);

    if (existingEnvironment === null) {
      throw new NotFoundException('Environment bulunamadi.');
    }

    const parseResult: {
      entries: { key: string; value: string }[];
      skippedLines: number;
    } = this.parseDotenvImportContent(payload.content);

    const replaceAll: boolean = payload.replaceAll ?? false;

    if (replaceAll) {
      const counts: { removed: number; created: number } =
        await this.environmentRepository.replaceAllEnvVariablesForEnvironment(
          environmentId,
          parseResult.entries,
        );

      return {
        created: counts.created,
        updated: 0,
        removed: counts.removed,
        importedKeys: parseResult.entries.length,
        skippedLines: parseResult.skippedLines,
      };
    }

    let created: number = 0;
    let updated: number = 0;

    for (const row of parseResult.entries) {
      const prior: { id: string } | null =
        await this.environmentRepository.findEnvVariableByKeyAndEnvironmentId(
          environmentId,
          row.key,
        );

      await this.environmentRepository.upsertEnvVariableByKeyAndEnvironmentId(
        environmentId,
        row.key,
        row.value,
      );

      if (prior === null) {
        created += 1;
      } else {
        updated += 1;
      }
    }

    return {
      created,
      updated,
      removed: 0,
      importedKeys: parseResult.entries.length,
      skippedLines: parseResult.skippedLines,
    };
  }

  private parseDotenvImportContent(content: string): {
    entries: { key: string; value: string }[];
    skippedLines: number;
  } {
    const normalized: string = content.replace(/\r\n/g, '\n');
    const lines: string[] = normalized.split('\n');
    const rawEntries: { key: string; value: string }[] = [];
    let skippedLines: number = 0;

    for (const line of lines) {
      const trimmedLine: string = line.trim();
      if (trimmedLine === '' || trimmedLine.startsWith('#')) {
        continue;
      }

      let work: string = trimmedLine;
      if (work.toLowerCase().startsWith('export ')) {
        work = work.slice(7).trim();
      }

      const eqIndex: number = work.indexOf('=');
      if (eqIndex <= 0) {
        skippedLines += 1;
        continue;
      }

      const rawKey: string = work.slice(0, eqIndex).trim();
      const rawValue: string = work.slice(eqIndex + 1);
      const key: string = this.parseImportedDotenvKey(rawKey).trim();

      if (key === '') {
        skippedLines += 1;
        continue;
      }

      const value: string = this.parseImportedDotenvValue(rawValue);
      rawEntries.push({ key, value });
    }

    const entries: { key: string; value: string }[] =
      this.dedupeDotenvEntriesLastWins(rawEntries);

    return { entries, skippedLines };
  }

  private dedupeDotenvEntriesLastWins(
    rows: { key: string; value: string }[],
  ): { key: string; value: string }[] {
    const map: Map<string, string> = new Map<string, string>();

    for (const row of rows) {
      map.set(row.key, row.value);
    }

    return Array.from(map.entries()).map(
      ([key, value]: [string, string]) => ({ key, value }),
    );
  }

  private parseImportedDotenvKey(raw: string): string {
    const t: string = raw.trim();

    if (t.length >= 2 && t.startsWith('"') && t.endsWith('"')) {
      return this.unescapeQuotedDotenvKey(t.slice(1, -1));
    }

    if (t.length >= 2 && t.startsWith("'") && t.endsWith("'")) {
      return t.slice(1, -1);
    }

    return t;
  }

  private unescapeQuotedDotenvKey(inner: string): string {
    return inner.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }

  private parseImportedDotenvValue(raw: string): string {
    const v: string = raw;

    if (v.startsWith('"')) {
      return this.parseImportedDoubleQuotedValue(v);
    }

    if (v.startsWith("'")) {
      const endIndex: number = v.indexOf("'", 1);
      if (endIndex === -1) {
        return v.slice(1);
      }
      return v.slice(1, endIndex);
    }

    return v.trim();
  }

  private parseImportedDoubleQuotedValue(raw: string): string {
    if (!raw.startsWith('"')) {
      return raw.trim();
    }

    let i: number = 1;
    let result: string = '';

    while (i < raw.length) {
      const c: string = raw[i];

      if (c === '\\' && i + 1 < raw.length) {
        const n: string = raw[i + 1];
        switch (n) {
          case 'n':
            result += '\n';
            i += 2;
            continue;
          case '"':
            result += '"';
            i += 2;
            continue;
          case '\\':
            result += '\\';
            i += 2;
            continue;
          default:
            result += n;
            i += 2;
            continue;
        }
      }

      if (c === '"') {
        return result;
      }

      result += c;
      i += 1;
    }

    return result;
  }

  private formatDotenvLine(key: string, value: string): string {
    const trimmedKey: string = key.trim();
    const encodedKey: string = this.escapeDotenvKey(trimmedKey);
    const encodedValue: string = this.escapeDotenvValue(value);
    return `${encodedKey}=${encodedValue}`;
  }

  private escapeDotenvKey(key: string): string {
    if (key.length === 0) {
      return key;
    }

    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
      return key;
    }

    return `"${key.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }

  private escapeDotenvValue(value: string): string {
    if (value === '') {
      return '';
    }

    const needsQuotes: boolean =
      /[\s#'"]/.test(value) ||
      value.includes('=') ||
      value.includes('\n') ||
      value.includes('\r') ||
      value.includes('\\');

    if (!needsQuotes) {
      return value;
    }

    const escaped: string = value
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n/g, '\\n');

    return `"${escaped}"`;
  }

  private sanitizeDownloadBaseName(name: string): string {
    const trimmed: string = name.trim();
    const safe: string = trimmed.replace(/[^a-zA-Z0-9._-]+/g, '_');
    return safe.length > 0 ? safe : 'environment';
  }

  private buildDotenvAttachmentFileName(baseName: string): string {
    const lower: string = baseName.toLowerCase();
    if (lower.endsWith('.env')) {
      return baseName;
    }

    return `${baseName}.env`;
  }
}
