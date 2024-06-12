import {
  Cryptography,
  CryptographySymbol,
  JwtAdapter,
  JwtSymbol,
} from '@account/domain/adapters';
import {
  AccountRepository,
  AccountRepositorySymbol,
} from '@account/domain/repositories';
import {
  SignUpUseCase,
  SignUpUseCaseParams,
  SignUpUseCaseResponse,
} from '@account/domain/usecases';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SignUpService implements SignUpUseCase {
  @Inject(AccountRepositorySymbol)
  private readonly accountRepository: AccountRepository;

  @Inject(CryptographySymbol)
  private readonly cryptography: Cryptography;

  @Inject(JwtSymbol)
  private readonly jwt: JwtAdapter;

  async execute(params: SignUpUseCaseParams): Promise<SignUpUseCaseResponse> {
    const accountAlreadyExists = await this.accountRepository.findByCpf(
      params.cpf,
    );

    if (accountAlreadyExists) {
      throw new ConflictException('User already exists');
    }

    const passwordHash = await this.cryptography.hash(params.password);

    const account = await this.accountRepository.create({
      name: params.name,
      cpf: params.cpf,
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const token = this.jwt.sign({
      id: account.id,
      name: account.name,
      cpf: account.cpf,
    });

    return {
      account,
      token,
    };
  }
}
