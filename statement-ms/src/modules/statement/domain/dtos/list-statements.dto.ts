import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { StatementOperationEnum } from '../models';

export class ListStatementsDTO {
  @IsNotEmpty()
  @IsPositive()
  public readonly accountId: number;

  @IsEnum(StatementOperationEnum)
  @IsOptional()
  public readonly operation: StatementOperationEnum;

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
