import { EnvironmentController } from './environment.controller';
import { EnvironmentRepository } from './environment.repository';
import { EnvironmentService } from './environment.service';

export class EnvironmentModule {
  public static createController(): EnvironmentController {
    const environmentRepository: EnvironmentRepository =
      new EnvironmentRepository();
    const environmentService: EnvironmentService = new EnvironmentService(
      environmentRepository,
    );
    return new EnvironmentController(environmentService);
  }
}
