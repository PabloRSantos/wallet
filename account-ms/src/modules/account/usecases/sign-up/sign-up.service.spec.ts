import { Test, TestingModule } from '@nestjs/testing';
import { CryptographySymbol, JwtSymbol } from '@account/domain/adapters';
import {
  AccountRepositoryMock,
  CryptographyMock,
  JwtMock,
} from '@account/mocks/infra';
import { ConflictException } from '@nestjs/common';
import { mockAccount } from '@account/mocks/domain';
import { SignUpService } from './sign-up.service';
import { SignUpUseCaseParams } from '@account/domain/usecases';
import { AccountRepositorySymbol } from '@account/domain/repositories';

let service: SignUpService;
let accountRepository: AccountRepositoryMock;
let cryptographyAdapter: CryptographyMock;
let jwtAdapter: JwtMock;

describe('SignUpService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpService,
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

    service = module.get(SignUpService);
    accountRepository = module.get(AccountRepositorySymbol);
    cryptographyAdapter = module.get(CryptographySymbol);
    jwtAdapter = module.get(JwtSymbol);
  });

  it('Should throw ConflictException if account already exists', async () => {
    const account = mockAccount();
    await accountRepository.create(account);

    const params: SignUpUseCaseParams = {
      name: account.name,
      cpf: account.cpf,
      password: account.password,
    };

    try {
      await service.execute(params);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
    }

    expect(accountRepository.calls.length).toBe(2);
    expect(accountRepository.calls[1]).toEqual({
      method: 'findByCpf',
      params: { cpf: params.cpf },
    });
  });

  it('Should create account on valid params', async () => {
    const account = mockAccount();

    const params: SignUpUseCaseParams = {
      name: account.name,
      cpf: account.cpf,
      password: account.password,
    };

    const response = await service.execute(params);

    expect(response.account.name).toBe(account.name);

    expect(accountRepository.calls.length).toBe(2);
    expect(accountRepository.calls[1]).toMatchObject({
      method: 'create',
      params: {
        name: account.name,
        cpf: account.cpf,
      },
    });

    expect(cryptographyAdapter.calls.length).toBe(1);
    expect(cryptographyAdapter.calls[0]).toMatchObject({
      method: 'hash',
      params: {
        value: params.password,
      },
    });

    expect(jwtAdapter.calls.length).toBe(1);
    expect(jwtAdapter.calls[0]).toMatchObject({
      method: 'sign',
      params: {
        name: account.name,
        cpf: account.cpf,
      },
    });
  });
});
