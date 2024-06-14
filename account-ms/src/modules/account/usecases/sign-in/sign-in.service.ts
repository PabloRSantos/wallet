import {
  Cryptography,
  CryptographySymbol,
  JwtAdapter,
  JwtSymbol,
} from '@account/domain/adapters';
import { AccountModel } from '@account/domain/models';
import {
  AccountRepository,
  AccountRepositorySymbol,
} from '@account/domain/repositories';
import {
  SignInUseCase,
  SignInUseCaseParams,
  SignInUseCaseResponse,
} from '@account/domain/usecases';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SignInService implements SignInUseCase {
  @Inject(AccountRepositorySymbol)
  private readonly AccountRepository: AccountRepository;

  @Inject(CryptographySymbol)
  private readonly cryptography: Cryptography;

  @Inject(JwtSymbol)
  private readonly jwt: JwtAdapter;

  async execute(params: SignInUseCaseParams): Promise<SignInUseCaseResponse> {
    const account = await this.AccountRepository.findByCpf(params.cpf);

    const passwordMatch =
      account &&
      (await this.cryptography.compare(params.password, account.password));

    if (!account || !passwordMatch) {
      throw new UnauthorizedException('Invalid cpf or password');
    }

    const token = this.jwt.sign({
      id: account.id,
      name: account.name,
      cpf: account.cpf,
    });

    return {
      account: plainToClass(AccountModel, account),
      token,
    };
  }
}
