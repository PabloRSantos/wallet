import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SignInDTO, SignUpDTO } from '@account/domain/dtos';
import {
  AccountClientSymbol,
  ClientProxyAdapter,
} from '@common/domain/adapters';

@Controller('account')
export class AccountController {
  constructor(
    @Inject(AccountClientSymbol) private client: ClientProxyAdapter,
  ) {}

  @Post('signup')
  async signUp(
    @Body() body: SignUpDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { data, status, error } = await this.client.send('sign-up', body);

    response.status(status);
    return { data, error };
  }

  @Post('signin')
  async signIn(
    @Body() body: SignInDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { data, status, error } = await this.client.send('sign-in', body);

    response.status(status);
    return { data, error };
  }
}
