import { IsNotEmpty, IsString } from 'class-validator';

export class EnvironmentDto {
  @IsString()
  @IsNotEmpty()
  public id!: string;

  @IsString()
  @IsNotEmpty()
  public name!: string;

  @IsString()
  @IsNotEmpty()
  public projectId!: string;
}
