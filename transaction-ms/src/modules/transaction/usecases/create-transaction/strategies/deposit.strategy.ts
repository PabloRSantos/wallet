import { BadRequestException } from '@nestjs/common';
import { CreateTransactionDTO } from '@transaction/domain/dtos';
import { CreateTransactionStrategy } from '@transaction/domain/strategies';

export class DepositStrategy implements CreateTransactionStrategy {
  async execute(
    transaction: CreateTransactionDTO,
  ): Promise<CreateTransactionDTO> {
    if (transaction.amount <= 0) {
      throw new BadRequestException('Amount must be positive');
    }

    return {
      ...transaction,
      parentId: null,
    };
  }
}
