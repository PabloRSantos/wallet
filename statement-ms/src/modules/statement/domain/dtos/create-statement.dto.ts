import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { StatementOperationEnum } from '../models';

export class CreateStatementDTO {
  @IsNotEmpty()
  @IsPositive()
  accountId: number;

  @IsNotEmpty()
  @IsUUID()
  transactionId: string;

  @IsEnum(StatementOperationEnum)
  @IsNotEmpty()
  public readonly operation: StatementOperationEnum;

  @IsNotEmpty()
  @IsNumber()
  public readonly amount: number;

  @IsNotEmpty()
  @IsNumber()
  public readonly balance: number;

  @IsNotEmpty()
  @IsDateString()
  public readonly createdAt: string;
}
