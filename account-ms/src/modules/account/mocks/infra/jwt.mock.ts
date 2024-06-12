import { JwtAdapter, JwtPayload } from '@account/domain/adapters';

type TokensMock = {
  [key: string]: JwtPayload;
};

export class JwtMock implements JwtAdapter {
  calls: any[] = [];
  tokens: TokensMock = {};

  sign(payload: JwtPayload): string {
    const token = crypto.randomUUID();
    this.calls.push({
      method: 'sign',
      params: payload,
    });
    this.tokens[token] = payload;

    return token;
  }
  verify(token: string): JwtPayload {
    this.calls.push({
      method: 'verify',
      params: { token },
    });

    const payload = this.tokens[token];

    if (!payload) throw new Error();

    return payload;
  }
}
