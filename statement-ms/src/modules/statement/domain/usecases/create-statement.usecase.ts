import { CreateStatementDTO } from '../dtos';

export const CreateStatementSymbol = Symbol('CreateStatementUseCase');
export type CreateStatementUseCaseParams = CreateStatementDTO;

export type CreateStatementUseCase = {
  execute: (params: CreateStatementUseCaseParams) => Promise<void>;
};
