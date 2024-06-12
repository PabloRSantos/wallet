import { SignUpDTO } from '../dtos';
import { AccountModel } from '../models';

export const SignUpSymbol = Symbol('SignUpUseCase');
export type SignUpUseCaseParams = SignUpDTO;
export type SignUpUseCaseResponse = {
  account: AccountModel;
  token: string;
};

export type SignUpUseCase = {
  execute: (params: SignUpUseCaseParams) => Promise<SignUpUseCaseResponse>;
};
