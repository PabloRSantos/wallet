import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
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
