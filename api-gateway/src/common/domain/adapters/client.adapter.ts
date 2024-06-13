export const AccountClientSymbol = Symbol('AccountMSClient');
export const TransactionClientSymbol = Symbol('TransactionMSClient');

export type ClientProxyAdapterResponse<T = any> = {
  data: T;
  status: number;
  error: any;
};

export type ClientProxyAdapter = {
  send<T = any>(
    event: string,
    payload: any,
  ): Promise<ClientProxyAdapterResponse<T>>;
};
