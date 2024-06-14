import { Module } from '@nestjs/common';
import { AccountModule } from '@account/account.module';
import { StatementController } from './presentation/statement.controller';
import { StatementClientSymbol } from '@common/domain/adapters';
import { StatementClientAdapter } from './infra';

@Module({
  imports: [AccountModule],
  controllers: [StatementController],
  providers: [
    {
      provide: StatementClientSymbol,
      useClass: StatementClientAdapter,
    },
  ],
})
export class StatementModule {}
