import { StatementModel } from '@statement/domain/models';
import {
  ListStatementsParams,
  ListStatementsResponse,
  StatementRepository,
} from '@statement/domain/repositories';

export class StatementRepositoryMock implements StatementRepository {
  calls: any[] = [];
  db: StatementModel[] = [];
  lastId = 1;

  create(payload: StatementModel): Promise<StatementModel> {
    this.calls.push({
      method: 'create',
      params: payload,
    });

    payload.id = this.lastId++;
    this.db.push(payload);

    return Promise.resolve(payload);
  }

  list(payload: ListStatementsParams): Promise<ListStatementsResponse> {
    this.calls.push({
      method: 'list',
      params: payload,
    });

    const statements = this.db.filter(
      (statement) => statement.accountId === payload.accountId,
    );

    return Promise.resolve({
      rows: statements,
      metadata: {
        pages: 1,
        currentPage: 1,
        perPage: 1000,
        count: statements.length,
      },
    });
  }
}
