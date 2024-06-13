import {
  ClientProxyAdapter,
  ClientProxyAdapterResponse,
} from '@common/domain/adapters/client.adapter';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TransactionClientAdapter implements ClientProxyAdapter {
  client: ClientProxy;

  constructor(@Inject() private readonly configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get('TRANSACTION_MS_URL')],
        queue: this.configService.get('TRANSACTION_MS_QUEUE'),
      },
    });
  }

  async send<T = any>(
    event: string,
    payload: any,
  ): Promise<ClientProxyAdapterResponse<T>> {
    const { data, status, error } = await firstValueFrom(
      this.client.send({ cmd: event }, payload),
    );

    return {
      data,
      status,
      error,
    };
  }
}
