"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../prisma/prisma.module");
const variable_controller_1 = require("./variable.controller");
const variable_repository_1 = require("./variable.repository");
const variable_service_1 = require("./variable.service");
let VariableModule = class VariableModule {
};
exports.VariableModule = VariableModule;
exports.VariableModule = VariableModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [variable_controller_1.VariableController],
        providers: [variable_service_1.VariableService, variable_repository_1.VariableRepository],
        exports: [variable_service_1.VariableService],
    })
], VariableModule);
//# sourceMappingURL=variable.module.js.map