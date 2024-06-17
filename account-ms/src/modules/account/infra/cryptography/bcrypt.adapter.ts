import { Cryptography } from '@account/domain/adapters';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptImplAdapter implements Cryptography {
  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);

    return isValid;
  }

  async hash(value: string, salt = 12): Promise<string> {
    const hash = await bcrypt.hash(value, salt);

    return hash;
  }
}
