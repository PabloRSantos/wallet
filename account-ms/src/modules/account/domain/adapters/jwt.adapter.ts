import { AccountModel } from '@account/domain/models';

export const JwtSymbol = Symbol('JwtAdapter');

export type JwtPayload = Pick<AccountModel, 'id' | 'name' | 'cpf'>;
export type JwtAdapter = {
  sign(payload: JwtPayload): string;
  verify(token: string): JwtPayload;
};
