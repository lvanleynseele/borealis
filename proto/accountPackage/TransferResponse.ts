// Original file: proto/account.proto

import type { Long } from '@grpc/proto-loader';

export interface TransferResponse {
  'newBalance'?: (number | string | Long);
}

export interface TransferResponse__Output {
  'newBalance'?: (Long);
}
