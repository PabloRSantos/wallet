import { IsNotEmpty } from 'class-validator';

export class SignInDTO {
  @IsNotEmpty()
  readonly cpf: string;

  @IsNotEmpty()
  readonly password: string;
}
