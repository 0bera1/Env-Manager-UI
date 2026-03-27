import { EnvironmentDto } from './environment.dto';

export class EnvironmentRepository {
  public async findAllByProjectId(projectId: string): Promise<EnvironmentDto[]> {
    return Promise.resolve([]);
  }
}
