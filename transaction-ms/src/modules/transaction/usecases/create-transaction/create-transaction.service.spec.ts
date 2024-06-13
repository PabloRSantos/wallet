import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionService } from './create-transaction.service';
import { TransactionRepositorySymbol } from '@transaction/domain/repositories';
import { TransactionRepositoryMock } from '@transaction/mocks/infra';
import { mockTransaction } from '@transaction/mocks/domain';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { TransactionOperationEnum } from '@transaction/domain/models';

let service: CreateTransactionService;
let transactionRepository: TransactionRepositoryMock;

describe('CreateTransactionService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransactionService,
        {
          provide: TransactionRepositorySymbol,
          useClass: TransactionRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(CreateTransactionService);
    transactionRepository = module.get(TransactionRepositorySymbol);
  });

  it('Should throw ConflictException if transaction is duplicated', async () => {
    const transaction = mockTransaction();
    await transactionRepository.create(transaction);

    try {
      await service.execute(transaction);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
    }
  });

  it('Should throw BadRequestException if transaction operation is invalid', async () => {
    const transaction = mockTransaction({
      operation: 'wrong_operation' as TransactionOperationEnum,
    });

    try {
      await service.execute(transaction);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Should throw if strategy throws', async () => {
    const transaction = mockTransaction({
      operation: TransactionOperationEnum.DEPOSIT,
      amount: -50,
    });

    try {
      await service.execute(transaction);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Should create transaction on valid payload', async () => {
    const transaction = mockTransaction({
      operation: TransactionOperationEnum.DEPOSIT,
    });
    const response = await service.execute(transaction);

    expect(response.id).toBe(transaction.id);
    expect(transactionRepository.calls.length).toBe(2);
    expect(transactionRepository.calls[1]).toMatchObject({
      method: 'create',
      params: {
        id: transaction.id,
        operation: transaction.operation,
        amount: transaction.amount,
        accountId: transaction.accountId,
      },
    });
  });
});
