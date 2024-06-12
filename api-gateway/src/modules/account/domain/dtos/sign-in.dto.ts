import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
  @ApiProperty({
    example: 'pablo@mail.com',
    description: 'User email',
    type: 'string',
    required: true,
  })
  email: string;
  @ApiProperty({
    example: '12345678',
    description: 'User password',
    type: 'string',
    required: true,
  })
  password: string;
}
