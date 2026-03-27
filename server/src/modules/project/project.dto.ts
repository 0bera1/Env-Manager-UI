import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @IsString()
  @IsNotEmpty()
  public userId!: string;
}

export class ProjectDto {
  public id!: string;
  public name!: string;
  public userId!: string;
}
