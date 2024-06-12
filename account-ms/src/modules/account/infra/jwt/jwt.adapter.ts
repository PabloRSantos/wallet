import { JwtAdapter, JwtPayload } from '@account/domain/adapters';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtImpl implements JwtAdapter {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  sign(payload: JwtPayload): string {
    const secret = this.configService.get('JWT_SECRET');
    const expiration = this.configService.get('JWT_EXPIRATION');

    return jwt.sign(payload, secret, { expiresIn: expiration });
  }

  verify(token: string): JwtPayload {
    const secret = this.configService.get('JWT_SECRET');

    return jwt.verify(token, secret) as JwtPayload;
  }
}
