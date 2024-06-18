import { AccountModel } from '../models';

export const AccountRepositorySymbol = Symbol('AccountRepository');
export type AccountRepository = {
  create(payload: AccountModel): Promise<AccountModel>;
  findByCpf(cpf: string): Promise<AccountModel | null>;
};
