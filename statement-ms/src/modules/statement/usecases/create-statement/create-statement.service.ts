import { Inject, Injectable } from '@nestjs/common';
import {
  StatementRepository,
  StatementRepositorySymbol,
} from '@statement/domain/repositories';
import { CreateStatementDTO } from '@statement/domain/dtos';
import { CreateStatementUseCase } from '@statement/domain/usecases';

@Injectable()
export class CreateStatementService implements CreateStatementUseCase {
  @Inject(StatementRepositorySymbol)
  private readonly statementRepository: StatementRepository;

  async execute(payload: CreateStatementDTO): Promise<void> {
    await this.statementRepository.create({
      ...payload,
      createdAt: new Date(payload.createdAt),
    });
  }
}
