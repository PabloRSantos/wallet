import { ApiProperty } from '@nestjs/swagger';

export class ListStatementsDTO {
  @ApiProperty({
    description: 'the page where the data will come from',
    example: 1,
    type: 'integer',
    required: false,
    default: 1,
  })
  public readonly page: string;

  @ApiProperty({
    description: 'number of itens in page. The default is 10',
    example: 50,
    type: 'integer',
    required: false,
    default: 10,
  })
  public readonly perPage?: string;

  @ApiProperty({
    description: 'to filter statements created after the date provided',
    example: '2024-01-01',
    type: 'date',
    required: false,
  })
  public readonly periodStart?: string;

  @ApiProperty({
    description: 'to filter statements created before the date provided',
    example: '2024-06-01',
    type: 'date',
    required: false,
  })
  public readonly periodEnd?: string;

  @ApiProperty({
    enum: ['DEPOSIT', 'WITHDRAWAL', 'PURCHASE', 'CANCELLATION', 'REVERSAL'],
    required: false,
    description: 'to filter statements according to operation',
  })
  public readonly operation: string;
}
