// Original file: proto/transaction.proto

import type { Transaction as _transactionPackage_Transaction, Transaction__Output as _transactionPackage_Transaction__Output } from '../transactionPackage/Transaction';

export interface TransferRequest {
  'transaction'?: (_transactionPackage_Transaction | null);
}

export interface TransferRequest__Output {
  'transaction'?: (_transactionPackage_Transaction__Output);
}
