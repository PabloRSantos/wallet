import { Inject, Injectable } from '@nestjs/common';
import {
  StatementRepository,
  StatementRepositorySymbol,
} from '@statement/domain/repositories';
import { ListStatementsDTO } from '@statement/domain/dtos';
import {
  ListStatementsUseCase,
  ListStatementsUseCaseResponse,
} from '@statement/domain/usecases';

@Injectable()
export class ListStatementsService implements ListStatementsUseCase {
  @Inject(StatementRepositorySymbol)
  private readonly statementRepository: StatementRepository;

  async execute(
    payload: ListStatementsDTO,
  ): Promise<ListStatementsUseCaseResponse> {
    return this.statementRepository.list({
      accountId: payload.accountId,
      operation: payload.operation,
      createdAt: {
        gte: payload.periodStart && new Date(payload.periodStart),
        lte: payload.periodEnd && new Date(payload.periodEnd),
      },
      page: Number(payload.page),
      perPage: Number(payload.perPage),
    });
  }
}
