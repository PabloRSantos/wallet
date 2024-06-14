import { Test, TestingModule } from '@nestjs/testing';
import { CreateStatementService } from './create-statement.service';
import { StatementRepositorySymbol } from '@statement/domain/repositories';
import { StatementRepositoryMock } from '@statement/mocks/infra';
import { mockStatement } from '@statement/mocks/domain';

let service: CreateStatementService;
let statementRepository: StatementRepositoryMock;

describe('CreateStatementService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateStatementService,
        {
          provide: StatementRepositorySymbol,
          useClass: StatementRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(CreateStatementService);
    statementRepository = module.get(StatementRepositorySymbol);
  });

  it('Should create statement on valid payload', async () => {
    const statement = mockStatement();
    await service.execute({
      ...statement,
      createdAt: statement.createdAt.toISOString(),
    });

    expect(statementRepository.calls.length).toBe(1);
    expect(statementRepository.calls[0]).toMatchObject({
      method: 'create',
      params: {
        ...statement,
        id: 1,
      },
    });
  });
});
