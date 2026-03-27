import { IsNotEmpty, IsString } from 'class-validator';

export class VariableDto {
  @IsString()
  @IsNotEmpty()
  public id!: string;

  @IsString()
  @IsNotEmpty()
  public key!: string;

  @IsString()
  @IsNotEmpty()
  public value!: string;

  @IsString()
  @IsNotEmpty()
  public environmentId!: string;
}
