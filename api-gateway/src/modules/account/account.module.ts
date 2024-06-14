import { Module } from '@nestjs/common';
import { VerifyTokenService } from './usecases';
import { VerifyTokenSymbol } from './domain/usecases';
import { AccountController } from './presentation/account.controller';
import { AccountClientSymbol } from '@common/domain/adapters';
import { AccountClientAdapter } from './infra';

@Module({
  controllers: [AccountController],
  providers: [
    {
      provide: AccountClientSymbol,
      useClass: AccountClientAdapter,
    },
    {
      provide: VerifyTokenSymbol,
      useClass: VerifyTokenService,
    },
  ],
  exports: [
    {
      provide: VerifyTokenSymbol,
      useClass: VerifyTokenService,
    },
  ],
})
export class AccountModule {}
