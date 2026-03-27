import { VariableDto } from './variable.dto';

export class VariableRepository {
  public async findAllByEnvironmentId(
    environmentId: string,
  ): Promise<VariableDto[]> {
    return Promise.resolve([]);
  }
}
