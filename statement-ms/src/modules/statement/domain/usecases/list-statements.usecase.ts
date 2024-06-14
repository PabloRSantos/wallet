import { ListStatementsDTO } from '../dtos';
import { ListStatementsResponse } from '../repositories';

export const ListStatementsSymbol = Symbol('ListStatementsUseCase');
export type ListStatementsUseCaseParams = ListStatementsDTO;
export type ListStatementsUseCaseResponse = ListStatementsResponse;

export type ListStatementsUseCase = {
  execute: (
    params: ListStatementsUseCaseParams,
  ) => Promise<ListStatementsUseCaseResponse>;
};
