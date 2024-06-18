import { TransactionModel } from '../models';

export const TransactionRepositorySymbol = Symbol('TransactionRepository');
export type TransactionRepository = {
  create(payload: TransactionModel): Promise<TransactionModel>;
  findById(id: string): Promise<TransactionModel | null>;
  findByParentId(parentId: string): Promise<TransactionModel | null>;
  getBalance(accountId: number): Promise<number>;
};
