import { CreateTransactionDTO } from '../dtos';

export interface CreateTransactionStrategy {
  execute(transaction: CreateTransactionDTO): Promise<CreateTransactionDTO>;
}
