import { TransactionModel } from '@transaction/domain/models';
import { TransactionRepository } from '@transaction/domain/repositories';

export class TransactionRepositoryMock implements TransactionRepository {
  calls: any[] = [];
  db: TransactionModel[] = [];

  create(payload: TransactionModel): Promise<TransactionModel> {
    this.calls.push({
      method: 'create',
      params: payload,
    });

    this.db.push(payload);
    return Promise.resolve(payload);
  }
  findById(id: string): Promise<TransactionModel> {
    this.calls.push({
      method: 'findById',
      params: { id },
    });

    const transaction = this.db.find((transaction) => transaction.id === id);
    return Promise.resolve(transaction || null);
  }
  getBalance(accountId: number): Promise<number> {
    this.calls.push({
      method: 'getBalance',
      params: { accountId },
    });

    const balance = this.db.reduce((balance, transaction) => {
      if (transaction.accountId === accountId) {
        balance += transaction.amount;
      }

      return balance;
    }, 0);

    return Promise.resolve(balance);
  }
}
