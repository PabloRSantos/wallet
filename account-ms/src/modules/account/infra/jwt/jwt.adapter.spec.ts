import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '@account/domain/adapters';
import { mockAccount } from '@account/mocks/domain';
import { JwtImplAdapter } from './jwt.adapter';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

const JWT_TOKEN = 'some_token';
const JWT_PAYLOAD = {
  id: mockAccount().id,
  name: mockAccount().name,
  cpf: mockAccount().cpf,
};

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return JWT_TOKEN;
  },
  verify(): JwtPayload {
    return JWT_PAYLOAD;
  },
}));

let jwtAdapter: JwtImplAdapter;
let configService: ConfigService;

describe('JwtAdapter', () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtImplAdapter,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(
              (key) =>
                ({
                  JWT_SECRET: 'secret',
                  JWT_EXPIRATION: '1d',
                })[key],
            ),
          },
        },
      ],
    }).compile();

    jwtAdapter = module.get(JwtImplAdapter);
    configService = module.get(ConfigService);
  });

  describe('sign()', () => {
    test('Should return correct token', async () => {
      const secret = configService.get('JWT_SECRET');
      const expiration = configService.get('JWT_EXPIRATION');

      const signSpy = jest.spyOn(jwt, 'sign');

      const payload = mockAccount();
      const token = jwtAdapter.sign(payload);

      expect(token).toBe(JWT_TOKEN);
      expect(signSpy).toHaveBeenCalledWith(payload, secret, {
        expiresIn: expiration,
      });
    });
  });

  describe('verify()', () => {
    test('Should return correct payload', async () => {
      const secret = configService.get('JWT_SECRET');
      const verifySpy = jest.spyOn(jwt, 'verify');

      const token = 'some_token';
      const payload = jwtAdapter.verify(token);

      expect(payload).toEqual(JWT_PAYLOAD);
      expect(verifySpy).toHaveBeenCalledWith(token, secret);
    });
  });
});
