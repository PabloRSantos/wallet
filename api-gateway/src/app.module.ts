import { AccountModule } from '@account/account.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from '@transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AccountModule,
    TransactionModule,
  ],
})
export class AppModule {}
