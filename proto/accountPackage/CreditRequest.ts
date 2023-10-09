// Original file: proto/account.proto

import type { Long } from '@grpc/proto-loader';

export interface CreditRequest {
  'id'?: (string);
  'amount'?: (number | string | Long);
}

export interface CreditRequest__Output {
  'id'?: (string);
  'amount'?: (Long);
}
