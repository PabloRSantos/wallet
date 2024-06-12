import * as bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt.adapter';

const BCRYPT_HASH = 'some_hash';
jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve(BCRYPT_HASH);
  },
  async compare(): Promise<boolean> {
    return Promise.resolve(true);
  },
}));

const bcryptAdapter = new BcryptAdapter();

describe('BcryptAdapter', () => {
  describe('hash()', () => {
    test('Should call hash with correct values', async () => {
      const hashSpy = jest.spyOn(bcrypt, 'hash');

      const params = {
        value: 'any_value',
        salt: 12,
      };
      const hash = await bcryptAdapter.hash(params.value, params.salt);

      expect(hash).toBe(BCRYPT_HASH);
      expect(hashSpy).toHaveBeenCalledWith(params.value, params.salt);
    });
  });

  describe('compare()', () => {
    test('Should return true when compare succeeds', async () => {
      const isValid = await bcryptAdapter.compare('any_value', 'any_hash');

      expect(isValid).toBeTruthy();
    });

    test('Should return false when compare fails', async () => {
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementationOnce(async () => Promise.resolve(false));

      const isValid = await bcryptAdapter.compare('any_value', 'any_hash');

      expect(isValid).toBe(false);
    });
  });
});
