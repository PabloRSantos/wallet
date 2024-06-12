import { AccountModel } from '../models';

export const AccountRepositorySymbol = Symbol('AccountRepository');
export interface AccountRepository {
  create(payload: AccountModel): Promise<AccountModel>;
  findByCpf(cpf: string): Promise<AccountModel | null>;
  findById(id: number): Promise<AccountModel | null>;
}
