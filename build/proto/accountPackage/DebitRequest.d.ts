import type { Long } from '@grpc/proto-loader';
export interface DebitRequest {
    'id'?: (string);
    'amount'?: (number | string | Long);
}
export interface DebitRequest__Output {
    'id'?: (string);
    'amount'?: (Long);
}
