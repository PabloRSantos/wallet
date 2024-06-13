import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTransactionDTO } from '@transaction/domain/dtos';
import {
  CreateTransactionSymbol,
  CreateTransactionUseCase,
} from '@transaction/domain/usecases';

@Controller()
export class TransactionController {
  @Inject(CreateTransactionSymbol)
  private readonly createTransactionService: CreateTransactionUseCase;

  @MessagePattern({ cmd: 'create-transaction' })
  async createTransaction(@Payload() payload: CreateTransactionDTO) {
    const response = await this.createTransactionService.execute(payload);

    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
