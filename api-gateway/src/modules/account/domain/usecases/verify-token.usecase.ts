import { AccountModel } from '../models';

export const VerifyTokenSymbol = Symbol('VerifyTokenUseCase');
export type VerifyTokenUseCaseParams = { token: string };
export type VerifyTokenUseCaseResponse = {
  data: AccountModel;
  status: number;
  error: any;
};

export type VerifyTokenUseCase = {
  execute: (
    params: VerifyTokenUseCaseParams,
  ) => Promise<VerifyTokenUseCaseResponse>;
};
