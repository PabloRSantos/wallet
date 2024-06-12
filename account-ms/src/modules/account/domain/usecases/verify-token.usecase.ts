import { AccountModel } from '@account/domain/models';
import { VerifyTokenDTO } from '../dtos';

export const VerifyTokenSymbol = Symbol('VerifyTokenUseCase');
export type VerifyTokenUseCaseParams = VerifyTokenDTO;
export type VerifyTokenUseCaseResponse = Pick<
  AccountModel,
  'id' | 'cpf' | 'name'
>;

export type VerifyTokenUseCase = {
  execute: (
    params: VerifyTokenUseCaseParams,
  ) => Promise<VerifyTokenUseCaseResponse>;
};
