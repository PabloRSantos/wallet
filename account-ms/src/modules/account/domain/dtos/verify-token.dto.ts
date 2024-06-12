import { IsJWT, IsNotEmpty } from 'class-validator';

export class VerifyTokenDTO {
  @IsNotEmpty()
  @IsJWT()
  readonly token: string;
}
