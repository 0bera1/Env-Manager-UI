import { VariableDto } from './variable.dto';
import { VariableRepository } from './variable.repository';

export class VariableService {
  public constructor(private readonly variableRepository: VariableRepository) {}

  public async getVariablesByEnvironmentId(
    environmentId: string,
  ): Promise<VariableDto[]> {
    return this.variableRepository.findAllByEnvironmentId(environmentId);
  }
}
