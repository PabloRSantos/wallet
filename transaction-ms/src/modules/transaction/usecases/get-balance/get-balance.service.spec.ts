import { Test, TestingModule } from '@nestjs/testing';
import { TransactionRepositorySymbol } from '@transaction/domain/repositories';
import { TransactionRepositoryMock } from '@transaction/mocks/infra';
import { GetBalanceService } from './get-balance.service';

let service: GetBalanceService;
let transactionRepository: TransactionRepositoryMock;

describe('GetBalanceService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetBalanceService,
        {
          provide: TransactionRepositorySymbol,
          useClass: TransactionRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(GetBalanceService);
    transactionRepository = module.get(TransactionRepositorySymbol);
  });

  it('Should call repository with correct parameters', async () => {
    const accountId = 1;

    await service.execute({
      accountId,
    });

    expect(transactionRepository.calls.length).toBe(1);
    expect(transactionRepository.calls[0]).toEqual({
      method: 'getBalance',
      params: { accountId },
    });
  });
});
