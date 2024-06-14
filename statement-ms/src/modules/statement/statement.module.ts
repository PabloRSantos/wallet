import { PrismaConnector } from '@common/database/connection';
import { Module } from '@nestjs/common';
import { StatementController } from './presentation';
import { StatementRepositorySymbol } from './domain/repositories';
import { StatementImplRepository } from './infra/database';
import { CreateStatementSymbol, ListStatementsSymbol } from './domain/usecases';
import { CreateStatementService, ListStatementsService } from './usecases';

@Module({
  controllers: [StatementController],
  providers: [
    PrismaConnector,
    {
      provide: StatementRepositorySymbol,
      useClass: StatementImplRepository,
    },
    {
      provide: CreateStatementSymbol,
      useClass: CreateStatementService,
    },
    {
      provide: ListStatementsSymbol,
      useClass: ListStatementsService,
    },
  ],
})
export class StatementModule {}
