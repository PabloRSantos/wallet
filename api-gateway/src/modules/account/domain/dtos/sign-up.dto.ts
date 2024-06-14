import { ApiProperty } from '@nestjs/swagger';

export class SignUpDTO {
  @ApiProperty({
    example: 'Pablo Rosa',
    description: 'account name',
    type: 'string',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: '87325790040',
    description: 'account cpf',
    type: 'string',
    required: true,
  })
  cpf: string;

  @ApiProperty({
    example: 'StrongPassword*1',
    description: 'account password',
    type: 'string',
    required: true,
  })
  password: string;
}
