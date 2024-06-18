import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDTO } from '@transaction/domain/dtos';
import { TransactionOperationEnum } from '@transaction/domain/models';
import { TransactionRepository } from '@transaction/domain/repositories';
import { CreateTransactionStrategy } from '@transaction/domain/strategies';

export class CancelationStrategy implements CreateTransactionStrategy {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(
    transaction: CreateTransactionDTO,
  ): Promise<CreateTransactionDTO> {
    const transactionToCancel = await this.transactionRepository.findById(
      transaction.parentId,
    );
    if (!transactionToCancel) {
      throw new NotFoundException('Transaction to be canceled was not found');
    }

    const alreadyCanceled = await this.transactionRepository.findByParentId(
      transaction.parentId,
    );
    if (alreadyCanceled) {
      throw new BadRequestException('Transaction has already been canceled');
    }

    const validOperationsToCancel = [
      TransactionOperationEnum.PURCHASE,
      TransactionOperationEnum.REVERSAL,
    ];
    if (!validOperationsToCancel.includes(transactionToCancel.operation)) {
      throw new ForbiddenException('Transaction cannot be cancelled');
    }

    const inverseAmount = -transactionToCancel.amount;
    return {
      ...transaction,
      amount: inverseAmount,
    };
  }
}
