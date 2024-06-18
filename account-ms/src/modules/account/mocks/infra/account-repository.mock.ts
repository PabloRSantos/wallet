import { AccountModel } from '@account/domain/models';
import { AccountRepository } from '@account/domain/repositories';

export class AccountRepositoryMock implements AccountRepository {
  calls: any[] = [];
  db: AccountModel[] = [];
  lastId = 1;

  create(payload: AccountModel): Promise<AccountModel> {
    this.calls.push({
      method: 'create',
      params: payload,
    });

    payload.id = this.lastId++;
    this.db.push(payload);

    return Promise.resolve(payload);
  }

  findByCpf(cpf: string): Promise<AccountModel | null> {
    this.calls.push({
      method: 'findByCpf',
      params: { cpf },
    });

    const account = this.db.find((account) => account.cpf === cpf);

    return Promise.resolve(account || null);
  }
}
