import { TransactionOperationEnum } from '@transaction/domain/models';
import { TransactionRepositoryMock } from '@transaction/mocks/infra';
import { mockTransaction } from '@transaction/mocks/domain';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { WithdrawStrategy } from './withdraw.strategy';

describe('WithdrawStrategy', () => {
  let strategy: WithdrawStrategy;
  let transactionRepository: TransactionRepositoryMock;

  beforeEach(async () => {
    transactionRepository = new TransactionRepositoryMock();
    strategy = new WithdrawStrategy(transactionRepository);
  });

  it('Should throw BadRequestException if transaction amount is positive', async () => {
    const transaction = mockTransaction({
      operation: TransactionOperationEnum.WITHDRAWAL,
      amount: 50,
    });

    try {
      await strategy.execute(transaction);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Should throw ForbiddenException if account does not have sufficient balance', async () => {
    const accountId = 1;

    await transactionRepository.create(
      mockTransaction({
        operation: TransactionOperationEnum.DEPOSIT,
        amount: 100,
        accountId,
      }),
    );

    const transaction = mockTransaction({
      operation: TransactionOperationEnum.WITHDRAWAL,
      amount: -200,
      accountId,
    });

    try {
      await strategy.execute(transaction);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });

  it('Should create transaction when sufficient balance', async () => {
    const accountId = 1;

    await transactionRepository.create(
      mockTransaction({
        operation: TransactionOperationEnum.DEPOSIT,
        amount: 100,
        accountId,
      }),
    );

    const transaction = mockTransaction({
      operation: TransactionOperationEnum.WITHDRAWAL,
      amount: -50,
      accountId,
    });

    const response = await strategy.execute(transaction);

    expect(response.id).toBe(transaction.id);
    expect(response.parentId).toBeNull();
  });
});
