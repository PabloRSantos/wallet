import {
  VerifyTokenUseCase,
  VerifyTokenUseCaseParams,
  VerifyTokenUseCaseResponse,
} from '@account/domain/usecases';
import {
  AccountClientSymbol,
  ClientProxyAdapter,
} from '@common/domain/adapters';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class VerifyTokenService implements VerifyTokenUseCase {
  constructor(
    @Inject(AccountClientSymbol) private client: ClientProxyAdapter,
  ) {}

  execute(
    params: VerifyTokenUseCaseParams,
  ): Promise<VerifyTokenUseCaseResponse> {
    return this.client.send('verify-token', params);
  }
}
