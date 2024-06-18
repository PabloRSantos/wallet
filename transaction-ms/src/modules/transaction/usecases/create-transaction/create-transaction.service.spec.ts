import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionService } from './create-transaction.service';
import { TransactionRepositorySymbol } from '@transaction/domain/repositories';
import {
  ClientAdapterMock,
  TransactionRepositoryMock,
} from '@transaction/mocks/infra';
import { mockTransaction } from '@transaction/mocks/domain';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { TransactionOperationEnum } from '@transaction/domain/models';
import { StatementClientSymbol } from '@transaction/domain/adapters';

let service: CreateTransactionService;
let transactionRepository: TransactionRepositoryMock;
let statementClient: ClientAdapterMock;

describe('CreateTransactionService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransactionService,
        {
          provide: TransactionRepositorySymbol,
          useClass: TransactionRepositoryMock,
        },
        {
          provide: StatementClientSymbol,
          useClass: ClientAdapterMock,
        },
      ],
    }).compile();

    service = module.get(CreateTransactionService);
    transactionRepository = module.get(TransactionRepositorySymbol);
    statementClient = module.get(StatementClientSymbol);
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
    expect(transactionRepository.calls.length).toBe(3);
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

  it('Should emit transaction-created message on transaction creation', async () => {
    const transaction = mockTransaction({
      operation: TransactionOperationEnum.DEPOSIT,
    });
    const response = await service.execute(transaction);

    expect(response.id).toBe(transaction.id);
    expect(statementClient.calls.length).toBe(1);
    expect(statementClient.calls[0]).toMatchObject({
      method: 'emit',
      params: {
        event: 'transaction-created',
        payload: {
          accountId: transaction.accountId,
          transactionId: transaction.id,
          operation: transaction.operation,
          amount: transaction.amount,
          balance: transaction.amount,
        },
      },
    });
  });
});
