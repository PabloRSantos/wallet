import { CreateTransactionDTO } from '../dtos';
import { TransactionModel } from '../models';

export const CreateTransactionSymbol = Symbol('CreateTransactionUseCase');
export type CreateTransactionUseCaseParams = CreateTransactionDTO;
export type CreateTransactionUseCaseResponse = TransactionModel;

export type CreateTransactionUseCase = {
  execute: (
    params: CreateTransactionUseCaseParams,
  ) => Promise<CreateTransactionUseCaseResponse>;
};
