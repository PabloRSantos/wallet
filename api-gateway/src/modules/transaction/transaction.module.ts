import { Module } from '@nestjs/common';
import { TransactionController } from './presentation/transaction.controller';
import { TransactionClientSymbol } from '@common/domain/adapters';
import { TransactionClientAdapter } from './infra';
import { AccountModule } from '@account/account.module';

@Module({
  imports: [AccountModule],
  controllers: [TransactionController],
  providers: [
    {
      provide: TransactionClientSymbol,
      useClass: TransactionClientAdapter,
    },
  ],
})
export class TransactionModule {}
