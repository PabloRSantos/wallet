import { PrismaConnector } from '@common/database/connection';
import { Module } from '@nestjs/common';
import { CreateTransactionSymbol } from './domain/usecases';
import { CreateTransactionService } from './usecases';
import { TransactionController } from './presentation';
import { TransactionRepositorySymbol } from './domain/repositories';
import { TransactionImplRepository } from './infra/database';

@Module({
  controllers: [TransactionController],
  providers: [
    PrismaConnector,
    {
      provide: TransactionRepositorySymbol,
      useClass: TransactionImplRepository,
    },
    {
      provide: CreateTransactionSymbol,
      useClass: CreateTransactionService,
    },
  ],
})
export class TransactionModule {}
