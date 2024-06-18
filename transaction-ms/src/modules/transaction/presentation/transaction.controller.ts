import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTransactionDTO, GetBalanceDTO } from '@transaction/domain/dtos';
import {
  CreateTransactionSymbol,
  CreateTransactionUseCase,
  GetBalanceSymbol,
  GetBalanceUseCase,
} from '@transaction/domain/usecases';

@Controller()
export class TransactionController {
  @Inject(CreateTransactionSymbol)
  private readonly createTransactionService: CreateTransactionUseCase;

  @Inject(GetBalanceSymbol)
  private readonly getBalanceService: GetBalanceUseCase;

  @MessagePattern({ cmd: 'create-transaction' })
  async createTransaction(@Payload() payload: CreateTransactionDTO) {
    const response = await this.createTransactionService.execute(payload);

    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  @MessagePattern({ cmd: 'get-balance' })
  async getBalance(@Payload() payload: GetBalanceDTO) {
    const response = await this.getBalanceService.execute(payload);

    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
