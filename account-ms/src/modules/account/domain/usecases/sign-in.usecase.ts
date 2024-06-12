import { SignInDTO } from '../dtos';
import { AccountModel } from '../models';

export const SignInSymbol = Symbol('SignInUseCase');
export type SignInUseCaseParams = SignInDTO;
export type SignInUseCaseResponse = { account: AccountModel; token: string };

export type SignInUseCase = {
  execute: (params: SignInUseCaseParams) => Promise<SignInUseCaseResponse>;
};
