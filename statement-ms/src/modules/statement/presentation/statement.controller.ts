import { Controller, HttpStatus, Inject } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateStatementDTO, ListStatementsDTO } from '@statement/domain/dtos';
import {
  CreateStatementSymbol,
  CreateStatementUseCase,
  ListStatementsSymbol,
  ListStatementsUseCase,
} from '@statement/domain/usecases';

@Controller()
export class StatementController {
  @Inject(CreateStatementSymbol)
  private readonly createStatementService: CreateStatementUseCase;

  @Inject(ListStatementsSymbol)
  private readonly listStatementsService: ListStatementsUseCase;

  @EventPattern('transaction-created')
  async createStatement(
    @Payload() payload: CreateStatementDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      await this.createStatementService.execute(payload);
      channel.ack(message);
    } catch (error) {
      console.error(error);
      channel.reject(message, false);
    }
  }

  @MessagePattern({ cmd: 'list-statements' })
  async listStatements(@Payload() payload: ListStatementsDTO) {
    const response = await this.listStatementsService.execute(payload);

    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
