import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { VariableController } from './variable.controller';
import { VariableRepository } from './variable.repository';
import { VariableService } from './variable.service';

@Module({
  imports: [PrismaModule],
  controllers: [VariableController],
  providers: [VariableService, VariableRepository],
  exports: [VariableService],
})
export class VariableModule {}
