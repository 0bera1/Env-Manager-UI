"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const environment_repository_1 = require("./environment.repository");
let EnvironmentService = class EnvironmentService {
    environmentRepository;
    constructor(environmentRepository) {
        this.environmentRepository = environmentRepository;
    }
    async getEnvironmentsByUserId(userId) {
        return this.environmentRepository.findAllByUserId(userId);
    }
    async createEnvironment(payload) {
        return this.environmentRepository.createEnvironment(payload.name, payload.userId);
    }
    async createEnvironmentWithDotenvImport(payload) {
        const parseResult = this.parseDotenvImportContent(payload.content);
        try {
            const environment = await this.environmentRepository.createEnvironmentWithEnvVariables(payload.name, payload.userId, parseResult.entries);
            const createdCount = parseResult.entries.length;
            const importSummary = {
                created: createdCount,
                updated: 0,
                removed: 0,
                importedKeys: createdCount,
                skippedLines: parseResult.skippedLines,
            };
            return { environment, import: importSummary };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2003') {
                throw new common_1.BadRequestException('Gecersiz kullanici kimligi veya bagimlilik hatasi.');
            }
            throw error;
        }
    }
    async deleteEnvironment(environmentId) {
        const existingEnvironment = await this.environmentRepository.findEnvironmentById(environmentId);
        if (existingEnvironment === null) {
            throw new common_1.NotFoundException('Environment bulunamadi.');
        }
        return this.environmentRepository.deleteEnvironmentById(environmentId);
    }
    async exportEnvironmentAsDotenv(environmentId) {
        const existingEnvironment = await this.environmentRepository.findEnvironmentById(environmentId);
        if (existingEnvironment === null) {
            throw new common_1.NotFoundException('Environment bulunamadi.');
        }
        const rows = await this.environmentRepository.findEnvVariablesKeyValueByEnvironmentId(environmentId);
        const lines = rows.map((row) => this.formatDotenvLine(row.key, row.value));
        const dotenvContent = lines.length > 0 ? `${lines.join('\n')}\n` : '';
        const downloadFileBaseName = this.sanitizeDownloadBaseName(existingEnvironment.name);
        const attachmentFileName = this.buildDotenvAttachmentFileName(downloadFileBaseName);
        return { dotenvContent, attachmentFileName };
    }
    async importEnvironmentFromDotenv(environmentId, payload) {
        const existingEnvironment = await this.environmentRepository.findEnvironmentById(environmentId);
        if (existingEnvironment === null) {
            throw new common_1.NotFoundException('Environment bulunamadi.');
        }
        const parseResult = this.parseDotenvImportContent(payload.content);
        const replaceAll = payload.replaceAll ?? false;
        if (replaceAll) {
            const counts = await this.environmentRepository.replaceAllEnvVariablesForEnvironment(environmentId, parseResult.entries);
            return {
                created: counts.created,
                updated: 0,
                removed: counts.removed,
                importedKeys: parseResult.entries.length,
                skippedLines: parseResult.skippedLines,
            };
        }
        let created = 0;
        let updated = 0;
        for (const row of parseResult.entries) {
            const prior = await this.environmentRepository.findEnvVariableByKeyAndEnvironmentId(environmentId, row.key);
            await this.environmentRepository.upsertEnvVariableByKeyAndEnvironmentId(environmentId, row.key, row.value);
            if (prior === null) {
                created += 1;
            }
            else {
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
    parseDotenvImportContent(content) {
        const normalized = content.replace(/\r\n/g, '\n');
        const lines = normalized.split('\n');
        const rawEntries = [];
        let skippedLines = 0;
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine === '' || trimmedLine.startsWith('#')) {
                continue;
            }
            let work = trimmedLine;
            if (work.toLowerCase().startsWith('export ')) {
                work = work.slice(7).trim();
            }
            const eqIndex = work.indexOf('=');
            if (eqIndex <= 0) {
                skippedLines += 1;
                continue;
            }
            const rawKey = work.slice(0, eqIndex).trim();
            const rawValue = work.slice(eqIndex + 1);
            const key = this.parseImportedDotenvKey(rawKey).trim();
            if (key === '') {
                skippedLines += 1;
                continue;
            }
            const value = this.parseImportedDotenvValue(rawValue);
            rawEntries.push({ key, value });
        }
        const entries = this.dedupeDotenvEntriesLastWins(rawEntries);
        return { entries, skippedLines };
    }
    dedupeDotenvEntriesLastWins(rows) {
        const map = new Map();
        for (const row of rows) {
            map.set(row.key, row.value);
        }
        return Array.from(map.entries()).map(([key, value]) => ({ key, value }));
    }
    parseImportedDotenvKey(raw) {
        const t = raw.trim();
        if (t.length >= 2 && t.startsWith('"') && t.endsWith('"')) {
            return this.unescapeQuotedDotenvKey(t.slice(1, -1));
        }
        if (t.length >= 2 && t.startsWith("'") && t.endsWith("'")) {
            return t.slice(1, -1);
        }
        return t;
    }
    unescapeQuotedDotenvKey(inner) {
        return inner.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
    parseImportedDotenvValue(raw) {
        const v = raw;
        if (v.startsWith('"')) {
            return this.parseImportedDoubleQuotedValue(v);
        }
        if (v.startsWith("'")) {
            const endIndex = v.indexOf("'", 1);
            if (endIndex === -1) {
                return v.slice(1);
            }
            return v.slice(1, endIndex);
        }
        return v.trim();
    }
    parseImportedDoubleQuotedValue(raw) {
        if (!raw.startsWith('"')) {
            return raw.trim();
        }
        let i = 1;
        let result = '';
        while (i < raw.length) {
            const c = raw[i];
            if (c === '\\' && i + 1 < raw.length) {
                const n = raw[i + 1];
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
    formatDotenvLine(key, value) {
        const trimmedKey = key.trim();
        const encodedKey = this.escapeDotenvKey(trimmedKey);
        const encodedValue = this.escapeDotenvValue(value);
        return `${encodedKey}=${encodedValue}`;
    }
    escapeDotenvKey(key) {
        if (key.length === 0) {
            return key;
        }
        if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
            return key;
        }
        return `"${key.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
    }
    escapeDotenvValue(value) {
        if (value === '') {
            return '';
        }
        const needsQuotes = /[\s#'"]/.test(value) ||
            value.includes('=') ||
            value.includes('\n') ||
            value.includes('\r') ||
            value.includes('\\');
        if (!needsQuotes) {
            return value;
        }
        const escaped = value
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n')
            .replace(/\n/g, '\\n');
        return `"${escaped}"`;
    }
    sanitizeDownloadBaseName(name) {
        const trimmed = name.trim();
        const safe = trimmed.replace(/[^a-zA-Z0-9._-]+/g, '_');
        return safe.length > 0 ? safe : 'environment';
    }
    buildDotenvAttachmentFileName(baseName) {
        const lower = baseName.toLowerCase();
        if (lower.endsWith('.env')) {
            return baseName;
        }
        return `${baseName}.env`;
    }
};
exports.EnvironmentService = EnvironmentService;
exports.EnvironmentService = EnvironmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [environment_repository_1.EnvironmentRepository])
], EnvironmentService);
//# sourceMappingURL=environment.service.js.map