export class StatementModel {
  id?: number;
  accountId: number;
  transactionId: string;
  operation: string;
  amount: number;
  balance: number;
  createdAt: Date;
}
