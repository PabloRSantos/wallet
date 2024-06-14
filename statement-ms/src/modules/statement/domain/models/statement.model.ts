export enum StatementOperationEnum {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  PURCHASE = 'PURCHASE',
  CANCELLATION = 'CANCELLATION',
  REVERSAL = 'REVERSAL',
}

export class StatementModel {
  id?: number;
  accountId: number;
  transactionId: string;
  operation: StatementOperationEnum;
  amount: number;
  balance: number;
  createdAt: Date;
}
