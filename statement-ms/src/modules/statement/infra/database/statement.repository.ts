import { PrismaConnector } from '@common/database/connection';
import { Inject } from '@nestjs/common';
import { StatementModel } from '@statement/domain/models';
import {
  ListStatementsParams,
  ListStatementsResponse,
  StatementRepository,
} from '@statement/domain/repositories';
import { plainToClass, plainToInstance } from 'class-transformer';

export class StatementImplRepository implements StatementRepository {
  @Inject(PrismaConnector)
  private readonly db: PrismaConnector;

  async create(payload: StatementModel): Promise<StatementModel> {
    const statement = await this.db.statement.create({
      data: payload,
    });

    return plainToClass(StatementModel, statement);
  }

  async list(payload: ListStatementsParams): Promise<ListStatementsResponse> {
    const page = payload.page || 1;
    const perPage = payload.perPage || 10;
    const where = {
      accountId: payload.accountId,
      createdAt: payload.createdAt,
      operation: payload.operation,
    };

    const [count, statements] = await Promise.all([
      this.db.statement.count({
        where,
      }),
      this.db.statement.findMany({
        where,
        take: perPage,
        skip: perPage * (page - 1),
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    const pages = Math.ceil(count / perPage);
    return {
      rows: plainToInstance(StatementModel, statements),
      metadata: {
        pages,
        currentPage: page,
        perPage,
        count,
      },
    };
  }
}
