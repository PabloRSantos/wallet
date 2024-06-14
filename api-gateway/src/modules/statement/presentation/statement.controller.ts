import { Controller, Get, Inject, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import {
  ClientProxyAdapter,
  StatementClientSymbol,
} from '@common/domain/adapters';
import { AuthGuard } from '@common/guards';
import { Account } from '@common/decorators';
import { AccountModel } from '@account/domain/models';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListStatementsDTO } from '../domain/dtos';

@ApiBearerAuth()
@ApiTags('Statement MS')
@Controller('statement')
export class StatementController {
  constructor(
    @Inject(StatementClientSymbol) private client: ClientProxyAdapter,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Statement from account' })
  @ApiResponse({ status: 400, description: 'Invalid body' })
  async list(
    @Query() query: ListStatementsDTO,
    @Account() account: AccountModel,
    @Res({ passthrough: true }) response: Response,
  ) {
    const params = {
      ...query,
      accountId: account.id,
    };

    const { data, status, error } = await this.client.send(
      'list-statements',
      params,
    );

    response.status(status);
    return { data, error };
  }
}
