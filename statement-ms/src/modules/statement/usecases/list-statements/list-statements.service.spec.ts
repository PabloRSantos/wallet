import { Test, TestingModule } from '@nestjs/testing';
import { StatementRepositorySymbol } from '@statement/domain/repositories';
import { StatementRepositoryMock } from '@statement/mocks/infra';
import { ListStatementsService } from './list-statements.service';

let service: ListStatementsService;
let statementRepository: StatementRepositoryMock;

describe('ListStatementsService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListStatementsService,
        {
          provide: StatementRepositorySymbol,
          useClass: StatementRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(ListStatementsService);
    statementRepository = module.get(StatementRepositorySymbol);
  });

  it('Should call repository with correct parameters', async () => {
    const params = {
      accountId: 1,
      operation: 'DEPOSIT',
      periodStart: new Date().toISOString(),
      periodEnd: new Date().toISOString(),
      page: '1',
      perPage: '1',
    };

    await service.execute(params);

    expect(statementRepository.calls.length).toBe(1);
    expect(statementRepository.calls[0]).toMatchObject({
      method: 'list',
      params: {
        accountId: params.accountId,
        operation: params.operation,
        createdAt: {
          gte: new Date(params.periodStart),
          lte: new Date(params.periodEnd),
        },
        page: Number(params.page),
        perPage: Number(params.perPage),
      },
    });
  });
});
