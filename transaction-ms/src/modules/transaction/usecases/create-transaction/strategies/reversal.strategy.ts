import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateTransactionDTO } from '@transaction/domain/dtos';
import { TransactionOperationEnum } from '@transaction/domain/models';
import { TransactionRepository } from '@transaction/domain/repositories';
import { CreateTransactionStrategy } from '@transaction/domain/strategies';

export class ReversalStrategy implements CreateTransactionStrategy {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(
    transaction: CreateTransactionDTO,
  ): Promise<CreateTransactionDTO> {
    const transactionToReversal = await this.transactionRepository.findById(
      transaction.parentId,
    );

    if (!transactionToReversal) {
      throw new NotFoundException('Transaction to be reversed was not found');
    }

    const validOperationsToReversal = [TransactionOperationEnum.PURCHASE];

    if (!validOperationsToReversal.includes(transactionToReversal.operation)) {
      throw new ForbiddenException('Transaction cannot be reversed');
    }

    const inverseAmount = -transactionToReversal.amount;
    return {
      ...transaction,
      amount: inverseAmount,
    };
  }
}
