import { VariableDto } from './variable.dto';
import { VariableService } from './variable.service';

export class VariableController {
  public constructor(private readonly variableService: VariableService) {}

  public async getVariablesByEnvironmentId(
    environmentId: string,
  ): Promise<VariableDto[]> {
    return this.variableService.getVariablesByEnvironmentId(environmentId);
  }
}
