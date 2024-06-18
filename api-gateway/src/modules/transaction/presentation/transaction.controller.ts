import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ClientProxyAdapter,
  TransactionClientSymbol,
} from '@common/domain/adapters';
import { CreateTransactionDTO } from '../domain/dtos';
import { AuthGuard } from '@common/guards';
import { Account } from '@common/decorators';
import { AccountModel } from '@account/domain/models';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Transaction MS')
@Controller()
export class TransactionController {
  constructor(
    @Inject(TransactionClientSymbol) private client: ClientProxyAdapter,
  ) {}

  @Post('transaction')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create account transaction' })
  @ApiBody({ type: CreateTransactionDTO })
  @ApiResponse({ status: 200, description: 'Transaction created' })
  @ApiResponse({ status: 400, description: 'Amount must be positive/negative' })
  @ApiResponse({
    status: 403,
    description: `Possible reasons:\n
      1. Insufficient balance;\n
      2. Transaction cannot be canceled/reversed;
    `,
  })
  @ApiResponse({
    status: 404,
    description: `Transaction to be cancelled/reversed was not found`,
  })
  async create(
    @Body() body: CreateTransactionDTO,
    @Account() account: AccountModel,
    @Res({ passthrough: true }) response: Response,
  ) {
    const params = {
      ...body,
      accountId: account.id,
    };

    const { data, status, error } = await this.client.send(
      'create-transaction',
      params,
    );

    response.status(status);
    return { data, error };
  }

  @Get('balance')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get account balance' })
  @ApiResponse({ status: 200, description: 'Account balance' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getBalance(
    @Account() account: AccountModel,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { data, status, error } = await this.client.send('get-balance', {
      accountId: account.id,
    });

    response.status(status);
    return { data, error };
  }
}
