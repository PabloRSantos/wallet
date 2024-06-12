import { Test, TestingModule } from '@nestjs/testing';
import { SignInService } from './sign-in.service';
import { CryptographySymbol, JwtSymbol } from '@account/domain/adapters';
import {
  AccountRepositoryMock,
  CryptographyMock,
  JwtMock,
} from '@account/mocks/infra';
import { UnauthorizedException } from '@nestjs/common';
import { mockAccount } from '@account/mocks/domain';
import { SignInUseCaseParams } from '@account/domain/usecases';
import { AccountRepositorySymbol } from '@account/domain/repositories';

let service: SignInService;
let accountRepository: AccountRepositoryMock;
let cryptographyAdapter: CryptographyMock;
let jwtAdapter: JwtMock;

describe('SignInService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInService,
        {
          provide: AccountRepositorySymbol,
          useClass: AccountRepositoryMock,
        },
        {
          provide: CryptographySymbol,
          useClass: CryptographyMock,
        },
        {
          provide: JwtSymbol,
          useClass: JwtMock,
        },
      ],
    }).compile();

    service = module.get(SignInService);
    accountRepository = module.get(AccountRepositorySymbol);
    cryptographyAdapter = module.get(CryptographySymbol);
    jwtAdapter = module.get(JwtSymbol);
  });

  it('Should throw UnauthorizedException if account not exists', async () => {
    const params: SignInUseCaseParams = {
      cpf: '123456',
      password: 'wrong-password',
    };

    try {
      await service.execute(params);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }

    expect(accountRepository.calls.length).toBe(1);
    expect(accountRepository.calls[0]).toEqual({
      method: 'findByCpf',
      params: { cpf: params.cpf },
    });
    expect(cryptographyAdapter.calls.length).toBe(0);
  });

  it('Should throw UnauthorizedException if password is wrong', async () => {
    const account = mockAccount();
    accountRepository.create(account);

    const params: SignInUseCaseParams = {
      cpf: account.cpf,
      password: 'wrong-password',
    };

    try {
      await service.execute(params);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }

    expect(accountRepository.calls.length).toBe(2);
    expect(accountRepository.calls[1]).toEqual({
      method: 'findByCpf',
      params: { cpf: params.cpf },
    });
    expect(cryptographyAdapter.calls.length).toBe(1);
    expect(cryptographyAdapter.calls[0]).toEqual({
      method: 'compare',
      params: {
        value: params.password,
        hash: account.password,
      },
    });
  });

  it('Should return token on valid credentials', async () => {
    const account = mockAccount();
    accountRepository.create(account);

    const params: SignInUseCaseParams = {
      cpf: account.cpf,
      password: account.password,
    };

    await service.execute(params);

    expect(jwtAdapter.calls[0]).toEqual({
      method: 'sign',
      params: {
        id: account.id,
        name: account.name,
        cpf: account.cpf,
      },
    });
  });
});
