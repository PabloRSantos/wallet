import { AccountModel } from '@account/domain/models';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Account = createParamDecorator(
  (_, ctx: ExecutionContext): AccountModel => {
    const request = ctx.switchToHttp().getRequest();
    return request.account;
  },
);
