import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { TransactionOperationEnum } from '@transaction/domain/models';
import {
  TransactionRepository,
  TransactionRepositorySymbol,
} from '@transaction/domain/repositories';
import {
  CreateTransactionUseCase,
  CreateTransactionUseCaseParams,
  CreateTransactionUseCaseResponse,
} from '@transaction/domain/usecases';
import {
  CancelationStrategy,
  DepositStrategy,
  PurchaseStrategy,
  ReversalStrategy,
  WithdrawStrategy,
} from './strategies';
import { CreateTransactionStrategy } from '@transaction/domain/strategies';

@Injectable()
export class CreateTransactionService implements CreateTransactionUseCase {
  @Inject(TransactionRepositorySymbol)
  private readonly transactionRepository: TransactionRepository;

  async execute(
    payload: CreateTransactionUseCaseParams,
  ): Promise<CreateTransactionUseCaseResponse> {
    const transactionAlreadyExists = await this.transactionRepository.findById(
      payload.id,
    );

    if (transactionAlreadyExists) {
      throw new ConflictException('Transaction already exists');
    }

    const handlers = {
      [TransactionOperationEnum.DEPOSIT]: DepositStrategy,
      [TransactionOperationEnum.WITHDRAWAL]: WithdrawStrategy,
      [TransactionOperationEnum.PURCHASE]: PurchaseStrategy,
      [TransactionOperationEnum.CANCELLATION]: CancelationStrategy,
      [TransactionOperationEnum.REVERSAL]: ReversalStrategy,
    };

    if (!handlers[payload.operation]) {
      throw new BadRequestException('Invalid transaction operation');
    }

    const strategy: CreateTransactionStrategy = new handlers[payload.operation](
      this.transactionRepository,
    );

    const response = await strategy.execute(payload);

    const createdTransaction = await this.transactionRepository.create({
      ...response,
      createdAt: new Date(),
    });

    return createdTransaction;
  }
}
