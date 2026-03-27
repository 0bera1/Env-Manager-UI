import { EnvironmentDto } from './environment.dto';
import { EnvironmentService } from './environment.service';

export class EnvironmentController {
  public constructor(
    private readonly environmentService: EnvironmentService,
  ) {}

  public async getEnvironmentsByProjectId(
    projectId: string,
  ): Promise<EnvironmentDto[]> {
    return this.environmentService.getEnvironmentsByProjectId(projectId);
  }
}
