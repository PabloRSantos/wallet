import { AccountModel } from '@account/domain/models';
import { AccountRepository } from '@account/domain/repositories';
import { PrismaConnector } from '@common/database/connection';
import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

export class AccountImplRepository implements AccountRepository {
  @Inject(PrismaConnector)
  private readonly db: PrismaConnector;

  async create(payload: AccountModel): Promise<AccountModel> {
    const account = await this.db.account.create({
      data: payload,
    });

    return plainToClass(AccountModel, account);
  }

  async findByCpf(cpf: string): Promise<AccountModel | null> {
    const account = await this.db.account.findFirst({ where: { cpf } });

    if (!account) return null;

    return plainToClass(AccountModel, account, { ignoreDecorators: true });
  }

  async findById(id: number): Promise<AccountModel | null> {
    const account = await this.db.account.findFirst({ where: { id } });

    if (!account) return null;

    return plainToClass(AccountModel, account);
  }
}
