import { ClientProxyAdapter } from '@transaction/domain/adapters';

export class ClientAdapterMock implements ClientProxyAdapter {
  calls: any[] = [];

  emit(event: string, payload: any): void {
    this.calls.push({
      method: 'emit',
      params: { event, payload },
    });
  }
}
