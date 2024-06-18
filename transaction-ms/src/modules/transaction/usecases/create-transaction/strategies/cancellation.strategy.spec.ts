import { TransactionOperationEnum } from '@transaction/domain/models';
import { CancelationStrategy } from './cancellation.strategy';
import { TransactionRepositoryMock } from '@transaction/mocks/infra';
import { mockTransaction } from '@transaction/mocks/domain';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

describe('CancelationStrategy', () => {
  let strategy: CancelationStrategy;
  let transactionRepository: TransactionRepositoryMock;

  beforeEach(async () => {
    transactionRepository = new TransactionRepositoryMock();
    strategy = new CancelationStrategy(transactionRepository);
  });

  it('Should throw NotFoundException if transaction was not found', async () => {
    const transaction = mockTransaction({
      operation: TransactionOperationEnum.CANCELLATION,
    });

    try {
      await strategy.execute(transaction);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('Should throw BadRequestException if transaction has already been canceled', async () => {
    const transactionToCancel = mockTransaction({
      operation: TransactionOperationEnum.PURCHASE,
    });
    await transactionRepository.create(transactionToCancel);

    const cancellationTransaction = mockTransaction({
      operation: TransactionOperationEnum.CANCELLATION,
      parentId: transactionToCancel.id,
    });
    await transactionRepository.create(cancellationTransaction);

    const duplicatedCancellationTransaction = mockTransaction({
      operation: TransactionOperationEnum.CANCELLATION,
      parentId: transactionToCancel.id,
    });

    try {
      await strategy.execute(duplicatedCancellationTransaction);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Should throw ForbiddenException if transaction cannot be canceled', async () => {
    const transactionToCancel = mockTransaction({
      operation: TransactionOperationEnum.DEPOSIT,
    });
    await transactionRepository.create(transactionToCancel);

    const transaction = mockTransaction({
      operation: TransactionOperationEnum.CANCELLATION,
      parentId: transactionToCancel.id,
    });

    try {
      await strategy.execute(transaction);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });

  it('Should create transaction on valid payload', async () => {
    const transactionToCancel = mockTransaction({
      operation: TransactionOperationEnum.PURCHASE,
    });

    await transactionRepository.create(transactionToCancel);

    const transaction = mockTransaction({
      operation: TransactionOperationEnum.CANCELLATION,
      parentId: transactionToCancel.id,
    });

    const response = await strategy.execute(transaction);

    expect(response.id).toBe(transaction.id);
    expect(response.amount).toBe(-transactionToCancel.amount);
  });
});
