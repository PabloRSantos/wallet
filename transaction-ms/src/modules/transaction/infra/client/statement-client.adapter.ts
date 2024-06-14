import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ClientProxyAdapter } from '@transaction/domain/adapters';

@Injectable()
export class StatementClientAdapter implements ClientProxyAdapter {
  client: ClientProxy;

  constructor(@Inject() private readonly configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get('RMQ_URL')],
        queue: this.configService.get('STATEMENT_MS_QUEUE'),
      },
    });
  }

  emit(event: string, payload: any): void {
    this.client.emit(event, payload);
  }
}
