import { TransactionModel } from '../models';

export const TransactionRepositorySymbol = Symbol('TransactionRepository');
export interface TransactionRepository {
  create(payload: TransactionModel): Promise<TransactionModel>;
  findById(id: string): Promise<TransactionModel | null>;
  getBalance(accountId: number): Promise<number>;
}
