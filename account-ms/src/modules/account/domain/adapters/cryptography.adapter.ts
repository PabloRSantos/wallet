export const CryptographySymbol = Symbol('CryptographyAdapter');

export type Cryptography = {
  compare(value: string, hash: string): Promise<boolean>;
  hash(value: string, salt?: number): Promise<string>;
};
