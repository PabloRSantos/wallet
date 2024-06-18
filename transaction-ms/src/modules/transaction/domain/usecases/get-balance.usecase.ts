import { GetBalanceDTO } from '../dtos';

export const GetBalanceSymbol = Symbol('GetBalanceUseCase');
export type GetBalanceUseCaseParams = GetBalanceDTO;
export type GetBalanceUseCaseResponse = { balance: number };

export type GetBalanceUseCase = {
  execute: (
    params: GetBalanceUseCaseParams,
  ) => Promise<GetBalanceUseCaseResponse>;
};
