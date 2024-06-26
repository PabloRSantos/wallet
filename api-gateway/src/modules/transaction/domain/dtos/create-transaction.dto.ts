import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDTO {
  @ApiProperty({
    type: 'string',
    required: true,
    example: '5ebcdb28-d499-4e98-91cb-0bbe8ceb8906',
    description: 'id of transaction, required to avoid duplications',
  })
  public readonly id: string;

  @ApiProperty({
    enum: ['DEPOSIT', 'WITHDRAWAL', 'PURCHASE', 'CANCELLATION', 'REVERSAL'],
    required: true,
    example: 'DEPOSIT',
    description: 'transaction operation type',
  })
  public readonly operation: string;

  @ApiProperty({
    type: 'integer',
    required: false,
    example: '1500',
    description: `The value of the transaction, represented in cents. If the transaction operation is:\n
      * WITHDRAW or PURCHASE: the value must be negative;\n
      * DEPOSIT: the value must be positive;\n
      * CANCELLATION or REVERSAL: the value does not need to be informed`,
  })
  public readonly amount: number;

  @ApiProperty({
    description:
      'id of parent Transaction, used for REVERSAL and CANCELLATION operations.',
    example: null,
    type: 'string',
    required: false,
  })
  public readonly parentId?: string;
}
