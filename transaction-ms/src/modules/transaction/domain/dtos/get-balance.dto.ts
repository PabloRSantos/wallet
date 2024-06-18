import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class GetBalanceDTO {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public readonly accountId: number;
}
