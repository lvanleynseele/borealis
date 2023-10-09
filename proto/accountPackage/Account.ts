// Original file: proto/account.proto

import type { Long } from '@grpc/proto-loader';

export interface Account {
  'id'?: (string);
  'name'?: (string);
  'balance'?: (number | string | Long);
}

export interface Account__Output {
  'id'?: (string);
  'name'?: (string);
  'balance'?: (Long);
}

export function isAccount(account: any): account is Account {
  return (
    account !== null &&
    typeof account === 'object' &&
    (account.id === undefined || typeof account.id === 'string') &&
    (account.name === undefined || typeof account.name === 'string') &&
    (account.balance === undefined ||
      typeof account.balance === 'number' ||
      typeof account.balance === 'string' ||
      typeof account.balance === 'bigint')
  );
}