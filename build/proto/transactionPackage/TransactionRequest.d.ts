import type { Long } from '@grpc/proto-loader';
export interface TransactionRequest {
    'senderId'?: (string);
    'receiverId'?: (string);
    'amount'?: (number | string | Long);
}
export interface TransactionRequest__Output {
    'senderId'?: (string);
    'receiverId'?: (string);
    'amount'?: (Long);
}
