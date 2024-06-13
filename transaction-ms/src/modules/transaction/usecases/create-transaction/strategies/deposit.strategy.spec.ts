import { TransactionOperationEnum } from '@transaction/domain/models';
import { mockTransaction } from '@transaction/mocks/domain';
import { DepositStrategy } from './deposit.strategy';
import { BadRequestException } from '@nestjs/common';

describe('DepositStrategy', () => {
  let strategy: DepositStrategy;

  beforeEach(async () => {
    strategy = new DepositStrategy();
  });

  it('Should throw BadRequestException if transaction amount is negative', async () => {
    const transaction = mockTransaction({
      operation: TransactionOperationEnum.DEPOSIT,
      amount: -50,
    });

    try {
      await strategy.execute(transaction);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Should create transaction on valid payload', async () => {
    const transaction = mockTransaction({
      operation: TransactionOperationEnum.DEPOSIT,
    });

    const response = await strategy.execute(transaction);

    expect(response.id).toBe(transaction.id);
    expect(response.parentId).toBeNull();
  });
});
