import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { CreateTransactionDTO } from '@transaction/domain/dtos';
import { TransactionRepository } from '@transaction/domain/repositories';
import { CreateTransactionStrategy } from '@transaction/domain/strategies';

export class PurchaseStrategy implements CreateTransactionStrategy {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(
    transaction: CreateTransactionDTO,
  ): Promise<CreateTransactionDTO> {
    if (transaction.amount >= 0) {
      throw new BadRequestException('Amount must be negative');
    }

    const balance = await this.transactionRepository.getBalance(
      transaction.accountId,
    );

    const positiveAmount = Math.abs(transaction.amount);
    if (positiveAmount > balance) {
      throw new ForbiddenException('Insufficient balance');
    }

    return {
      ...transaction,
      parentId: null,
    };
  }
}
