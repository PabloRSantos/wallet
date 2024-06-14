import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SignInDTO, SignUpDTO } from '@account/domain/dtos';
import {
  AccountClientSymbol,
  ClientProxyAdapter,
} from '@common/domain/adapters';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Account MS')
@Controller('account')
export class AccountController {
  constructor(
    @Inject(AccountClientSymbol) private client: ClientProxyAdapter,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create account' })
  @ApiBody({ type: SignUpDTO })
  @ApiResponse({ status: 200, description: 'Account created' })
  @ApiResponse({ status: 400, description: 'Invalid body' })
  @ApiResponse({ status: 409, description: 'Account already exists' })
  async signUp(
    @Body() body: SignUpDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { data, status, error } = await this.client.send('sign-up', body);

    response.status(status);
    return { data, error };
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in to account' })
  @ApiBody({ type: SignInDTO })
  @ApiResponse({ status: 200, description: 'Successful authentication' })
  @ApiResponse({ status: 400, description: 'Invalid body' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signIn(
    @Body() body: SignInDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { data, status, error } = await this.client.send('sign-in', body);

    response.status(status);
    return { data, error };
  }
}
