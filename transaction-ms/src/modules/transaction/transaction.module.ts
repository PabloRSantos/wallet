import { PrismaConnector } from '@common/database/connection';
import { Module } from '@nestjs/common';
import { CreateTransactionSymbol, GetBalanceSymbol } from './domain/usecases';
import { CreateTransactionService, GetBalanceService } from './usecases';
import { TransactionController } from './presentation';
import { TransactionRepositorySymbol } from './domain/repositories';
import { TransactionImplRepository } from './infra/database';
import { StatementClientSymbol } from './domain/adapters';
import { StatementClientAdapter } from './infra/client';

@Module({
  controllers: [TransactionController],
  providers: [
    PrismaConnector,
    {
      provide: StatementClientSymbol,
      useClass: StatementClientAdapter,
    },
    {
      provide: TransactionRepositorySymbol,
      useClass: TransactionImplRepository,
    },
    {
      provide: CreateTransactionSymbol,
      useClass: CreateTransactionService,
    },
    {
      provide: GetBalanceSymbol,
      useClass: GetBalanceService,
    },
  ],
})
export class TransactionModule {}
