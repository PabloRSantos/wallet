import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class CreateStatementDTO {
  @IsNotEmpty()
  @IsPositive()
  accountId: number;

  @IsNotEmpty()
  @IsUUID()
  transactionId: string;

  @IsNotEmpty()
  public readonly operation: string;

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
