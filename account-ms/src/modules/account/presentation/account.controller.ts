import { SignInDTO, SignUpDTO, VerifyTokenDTO } from '@account/domain/dtos';
import {
  SignInSymbol,
  SignInUseCase,
  SignUpSymbol,
  SignUpUseCase,
  VerifyTokenSymbol,
  VerifyTokenUseCase,
} from '@account/domain/usecases';
import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AccountController {
  @Inject(SignUpSymbol)
  private readonly signUpService: SignUpUseCase;

  @Inject(SignInSymbol)
  private readonly signInService: SignInUseCase;

  @Inject(VerifyTokenSymbol)
  private readonly verifyTokenService: VerifyTokenUseCase;

  @MessagePattern({ cmd: 'sign-up' })
  async signUp(@Payload() payload: SignUpDTO) {
    const response = await this.signUpService.execute(payload);

    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  @MessagePattern({ cmd: 'sign-in' })
  async signIn(@Payload() payload: SignInDTO) {
    const response = await this.signInService.execute(payload);

    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  @MessagePattern({ cmd: 'verify-token' })
  async verifyToken(@Payload() payload: VerifyTokenDTO) {
    const response = await this.verifyTokenService.execute(payload);

    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
