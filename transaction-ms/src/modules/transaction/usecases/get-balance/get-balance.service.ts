import { Inject, Injectable } from '@nestjs/common';
import {
  TransactionRepository,
  TransactionRepositorySymbol,
} from '@transaction/domain/repositories';
import {
  GetBalanceUseCase,
  GetBalanceUseCaseParams,
  GetBalanceUseCaseResponse,
} from '@transaction/domain/usecases';

@Injectable()
export class GetBalanceService implements GetBalanceUseCase {
  @Inject(TransactionRepositorySymbol)
  private readonly transactionRepository: TransactionRepository;

  async execute(
    payload: GetBalanceUseCaseParams,
  ): Promise<GetBalanceUseCaseResponse> {
    const balance = await this.transactionRepository.getBalance(
      payload.accountId,
    );

    return { balance };
  }
}
