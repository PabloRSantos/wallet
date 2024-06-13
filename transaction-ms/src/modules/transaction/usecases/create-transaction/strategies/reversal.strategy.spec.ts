import { TransactionOperationEnum } from '@transaction/domain/models';
import { TransactionRepositoryMock } from '@transaction/mocks/infra';
import { mockTransaction } from '@transaction/mocks/domain';
import { ReversalStrategy } from './reversal.strategy';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('ReversalStrategy', () => {
  let strategy: ReversalStrategy;
  let transactionRepository: TransactionRepositoryMock;

  beforeEach(async () => {
    transactionRepository = new TransactionRepositoryMock();
    strategy = new ReversalStrategy(transactionRepository);
  });

  it('Should throw NotFoundException if transaction was not found', async () => {
    const transaction = mockTransaction({
      operation: TransactionOperationEnum.REVERSAL,
    });

    try {
      await strategy.execute(transaction);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('Should throw ForbiddenException if transaction cannot be reversed', async () => {
    const transactionToReversal = mockTransaction({
      operation: TransactionOperationEnum.DEPOSIT,
    });
    await transactionRepository.create(transactionToReversal);

    const transaction = mockTransaction({
      operation: TransactionOperationEnum.REVERSAL,
      parentId: transactionToReversal.id,
    });

    try {
      await strategy.execute(transaction);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });

  it('Should create transaction on valid payload', async () => {
    const transactionToReversal = mockTransaction({
      operation: TransactionOperationEnum.PURCHASE,
    });

    await transactionRepository.create(transactionToReversal);

    const transaction = mockTransaction({
      operation: TransactionOperationEnum.REVERSAL,
      parentId: transactionToReversal.id,
    });

    const response = await strategy.execute(transaction);

    expect(response.id).toBe(transaction.id);
    expect(response.amount).toBe(-transactionToReversal.amount);
  });
});
