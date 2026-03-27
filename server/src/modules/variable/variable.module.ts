import { VariableController } from './variable.controller';
import { VariableRepository } from './variable.repository';
import { VariableService } from './variable.service';

export class VariableModule {
  public static createController(): VariableController {
    const variableRepository: VariableRepository = new VariableRepository();
    const variableService: VariableService = new VariableService(
      variableRepository,
    );
    return new VariableController(variableService);
  }
}
