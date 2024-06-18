import { CreateTransactionDTO } from '../dtos';

export type CreateTransactionStrategy = {
  execute(transaction: CreateTransactionDTO): Promise<CreateTransactionDTO>;
};
