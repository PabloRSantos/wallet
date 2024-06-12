import { Test, TestingModule } from '@nestjs/testing';
import { JwtMock } from '@account/mocks/infra';
import { VerifyTokenService } from './verify-token.service';
import { JwtSymbol } from '@account/domain/adapters';
import { VerifyTokenUseCaseParams } from '@account/domain/usecases';
import { UnauthorizedException } from '@nestjs/common';
import { mockAccount } from '@account/mocks/domain';

let service: VerifyTokenService;
let jwtAdapter: JwtMock;

describe('VerifyTokenService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VerifyTokenService,
        {
          provide: JwtSymbol,
          useClass: JwtMock,
        },
      ],
    }).compile();

    service = module.get(VerifyTokenService);
    jwtAdapter = module.get(JwtSymbol);
  });

  it('Should throw UnauthorizedException if token is invalid', async () => {
    const params: VerifyTokenUseCaseParams = {
      token: 'invalid_token',
    };

    try {
      await service.execute(params);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }

    expect(jwtAdapter.calls.length).toBe(1);
    expect(jwtAdapter.calls[0]).toEqual({
      method: 'verify',
      params: {
        token: params.token,
      },
    });
  });

  it('Should return payload if token is valid', async () => {
    const account = mockAccount();
    const token = jwtAdapter.sign(account);

    const params: VerifyTokenUseCaseParams = {
      token,
    };

    const response = await service.execute(params);

    expect(response).toEqual(account);

    expect(jwtAdapter.calls.length).toBe(2);
    expect(jwtAdapter.calls[1]).toEqual({
      method: 'verify',
      params: {
        token: params.token,
      },
    });
  });
});
