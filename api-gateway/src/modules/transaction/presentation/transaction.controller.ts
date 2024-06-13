import { Body, Controller, Inject, Post, Res, UseGuards } from '@nestjs/common';
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
@Controller('transaction')
export class TransactionController {
  constructor(
    @Inject(TransactionClientSymbol) private client: ClientProxyAdapter,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create account transaction' })
  @ApiBody({ type: CreateTransactionDTO })
  @ApiResponse({ status: 200, description: 'Transaction created' })
  @ApiResponse({
    status: 403,
    description: `Possible reasons:\n
      1. Insufficient balance;\n
      2. Transaction cannot be canceled. Used when a WITHDRAWAL or DEPOSIT transaction is being canceled`,
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
}
