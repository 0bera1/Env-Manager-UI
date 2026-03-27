import { EnvironmentDto } from './environment.dto';
import { EnvironmentRepository } from './environment.repository';

export class EnvironmentService {
  public constructor(
    private readonly environmentRepository: EnvironmentRepository,
  ) {}

  public async getEnvironmentsByProjectId(
    projectId: string,
  ): Promise<EnvironmentDto[]> {
    return this.environmentRepository.findAllByProjectId(projectId);
  }
}
