import { StatementModel, StatementOperationEnum } from '../models';

export const StatementRepositorySymbol = Symbol('StatementRepository');

export type ListStatementsParams = {
  accountId: number;
  operation?: StatementOperationEnum;
  createdAt?: {
    gte?: Date;
    lte?: Date;
  };
  page?: number;
  perPage?: number;
};

export type ListStatementsResponse = {
  rows: Array<StatementModel>;
  metadata: {
    pages: number;
    currentPage: number;
    perPage: number;
    count: number;
  };
};

export interface StatementRepository {
  create(payload: StatementModel): Promise<StatementModel>;
  list(payload: ListStatementsParams): Promise<ListStatementsResponse>;
}
