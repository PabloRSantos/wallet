import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly cpf: string;

  @IsNotEmpty()
  @IsStrongPassword()
  readonly password: string;
}
