import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class ListStatementsDTO {
  @IsNotEmpty()
  @IsPositive()
  public readonly accountId: number;

  @IsOptional()
  public readonly operation: string;

  @IsDateString()
  @IsOptional()
  public readonly periodStart?: string;

  @IsDateString()
  @IsOptional()
  public readonly periodEnd?: string;

  @IsNumberString()
  @IsOptional()
  public readonly page?: string;

  @IsNumberString()
  @IsOptional()
  public readonly perPage?: string;
}
