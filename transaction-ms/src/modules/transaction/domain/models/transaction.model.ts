export enum TransactionOperationEnum {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  PURCHASE = 'PURCHASE',
  CANCELLATION = 'CANCELLATION',
  REVERSAL = 'REVERSAL',
}

export class TransactionModel {
  id: string;
  accountId: number;
  operation: TransactionOperationEnum;
  amount: number;
  parentId?: string;
  createdAt: Date;
}
