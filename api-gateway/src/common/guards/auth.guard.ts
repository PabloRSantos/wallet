import {
  VerifyTokenSymbol,
  VerifyTokenUseCase,
} from '@account/domain/usecases';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(VerifyTokenSymbol)
  readonly verifyTokenService: VerifyTokenUseCase;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const { data, status } = await this.verifyTokenService.execute({
      token,
    });

    if (status !== 200) throw new UnauthorizedException();

    request.account = data;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
