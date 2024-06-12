import { JwtAdapter, JwtSymbol } from '@account/domain/adapters';
import {
  VerifyTokenUseCase,
  VerifyTokenUseCaseParams,
  VerifyTokenUseCaseResponse,
} from '@account/domain/usecases';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class VerifyTokenService implements VerifyTokenUseCase {
  @Inject(JwtSymbol)
  private readonly jwt: JwtAdapter;

  async execute(
    params: VerifyTokenUseCaseParams,
  ): Promise<VerifyTokenUseCaseResponse> {
    try {
      const payload = this.jwt.verify(params.token);

      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
