import { PrismaConnector } from '@common/database/connection';
import { Inject } from '@nestjs/common';
import { TransactionModel } from '@transaction/domain/models';
import { TransactionRepository } from '@transaction/domain/repositories';
import { plainToClass } from 'class-transformer';

export class TransactionImplRepository implements TransactionRepository {
  @Inject(PrismaConnector)
  private readonly db: PrismaConnector;

  async create(payload: TransactionModel): Promise<TransactionModel> {
    const transaction = await this.db.transaction.create({
      data: payload,
    });

    return plainToClass(TransactionModel, transaction);
  }

  async findById(id: string): Promise<TransactionModel> {
    const transaction = await this.db.transaction.findFirst({
      where: {
        id,
      },
    });

    if (!transaction) return null;

    return plainToClass(TransactionModel, transaction);
  }

  async findByParentId(parentId: string): Promise<TransactionModel> {
    const transaction = await this.db.transaction.findFirst({
      where: {
        parentId,
      },
    });

    if (!transaction) return null;

    return plainToClass(TransactionModel, transaction);
  }

  async getBalance(accountId: number): Promise<number> {
    const row = await this.db.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        accountId,
      },
    });

    return row._sum.amount || 0;
  }
}
