// Original file: proto/transaction.proto

import type { Long } from '@grpc/proto-loader';

export interface Transaction {
  'senderId'?: (string);
  'receiverId'?: (string);
  'amount'?: (number | string | Long);
}

export interface Transaction__Output {
  'senderId'?: (string);
  'receiverId'?: (string);
  'amount'?: (Long);
}
