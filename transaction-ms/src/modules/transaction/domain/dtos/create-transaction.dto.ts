import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { TransactionOperationEnum } from '../models';

export class CreateTransactionDTO {
  @IsNotEmpty()
  @IsUUID()
  public readonly id: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public readonly accountId: number;

  @IsEnum(TransactionOperationEnum)
  @IsNotEmpty()
  public readonly operation: TransactionOperationEnum;

  @IsNotEmpty()
  @IsInt()
  public amount: number;

  @IsOptional()
  @IsUUID()
  public readonly parentId?: string;
}
