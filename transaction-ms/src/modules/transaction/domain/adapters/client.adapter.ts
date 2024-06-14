export const StatementClientSymbol = Symbol('StatementMSClient');

export type ClientProxyAdapterResponse<T = any> = {
  data: T;
  status: number;
  error: any;
};

export type ClientProxyAdapter = {
  emit(event: string, payload: any): void;
};
