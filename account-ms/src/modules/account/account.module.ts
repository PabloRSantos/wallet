import { Module } from '@nestjs/common';
import {
  SignInService,
  SignUpService,
  VerifyTokenService,
} from '@account/usecases';
import { CryptographySymbol, JwtSymbol } from '@account/domain/adapters';
import {
  SignInSymbol,
  SignUpSymbol,
  VerifyTokenSymbol,
} from '@account/domain/usecases';
import { AccountController } from '@account/presentation';
import { PrismaConnector } from '@common/database/connection';
import { JwtImpl } from './infra/jwt/jwt.adapter';
import { BcryptAdapter } from './infra/cryptography';
import { AccountRepositorySymbol } from './domain/repositories';
import { AccountImplRepository } from './infra/database';

@Module({
  controllers: [AccountController],
  providers: [
    PrismaConnector,
    {
      provide: JwtSymbol,
      useClass: JwtImpl,
    },
    {
      provide: AccountRepositorySymbol,
      useClass: AccountImplRepository,
    },
    {
      provide: SignUpSymbol,
      useClass: SignUpService,
    },
    {
      provide: SignInSymbol,
      useClass: SignInService,
    },
    {
      provide: CryptographySymbol,
      useClass: BcryptAdapter,
    },
    {
      provide: VerifyTokenSymbol,
      useClass: VerifyTokenService,
    },
  ],
})
export class AccountModule {}
